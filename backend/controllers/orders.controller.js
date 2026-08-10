const db = require('../database');
const AppError = require('../utils/AppError');
const { verifyToken } = require('../utils/jwt');

const PRIORITY_PERCENTAGE = 0.2;
const ALLOWED_STATUSES = ['preparing', 'delivered'];

function formatOrder(order, items) {
  return {
    ...order,
    priority: Boolean(order.priority),
    cart: items,
  };
}

function getOrderWithItems(id) {
  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(id);
  if (!order) return null;
  const items = db.prepare('SELECT * FROM order_items WHERE orderId = ?').all(id);
  return formatOrder(order, items);
}

// If a valid token is present, attach the user id, but don't require it.
function getOptionalUserId(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;

  try {
    const decoded = verifyToken(authHeader.split(' ')[1]);
    return decoded.id;
  } catch {
    return null;
  }
}

function createOrder(req, res, next) {
  try {
    const { customer, phone, address, latitude, longitude, priority, cart } = req.body;

    if (!customer || !phone || !address) {
      return next(new AppError('Customer name, phone and address are required', 400));
    }

    if (!Array.isArray(cart) || cart.length === 0) {
      return next(new AppError('Cart cannot be empty', 400));
    }

    for (const item of cart) {
      if (!item.pizzaId || !item.name || !item.quantity || !item.unitPrice) {
        return next(new AppError('Each cart item requires pizzaId, name, quantity and unitPrice', 400));
      }
    }

    const orderPrice = cart.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const priorityPrice = priority ? Math.round(orderPrice * PRIORITY_PERCENTAGE) : 0;
    const totalPrice = orderPrice + priorityPrice;

    const userId = getOptionalUserId(req);

    const insertOrder = db.prepare(`
      INSERT INTO orders (userId, customer, phone, address, latitude, longitude, priority, status, orderPrice, priorityPrice, totalPrice)
      VALUES (@userId, @customer, @phone, @address, @latitude, @longitude, @priority, 'preparing', @orderPrice, @priorityPrice, @totalPrice)
    `);

    const insertItem = db.prepare(`
      INSERT INTO order_items (orderId, pizzaId, name, quantity, unitPrice, totalPrice)
      VALUES (@orderId, @pizzaId, @name, @quantity, @unitPrice, @totalPrice)
    `);

    const createOrderTransaction = db.transaction(() => {
      const result = insertOrder.run({
        userId: userId || null,
        customer,
        phone,
        address,
        latitude: latitude ?? null,
        longitude: longitude ?? null,
        priority: priority ? 1 : 0,
        orderPrice,
        priorityPrice,
        totalPrice,
      });

      const orderId = result.lastInsertRowid;

      for (const item of cart) {
        insertItem.run({
          orderId,
          pizzaId: item.pizzaId,
          name: item.name,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.quantity * item.unitPrice,
        });
      }

      return orderId;
    });

    const orderId = createOrderTransaction();

    res.status(201).json(getOrderWithItems(orderId));
  } catch (err) {
    next(err);
  }
}

function getOrders(req, res, next) {
  try {
    const orders = db.prepare('SELECT * FROM orders WHERE userId = ? ORDER BY createdAt DESC').all(req.user.id);

    const withItems = orders.map((order) => {
      const items = db.prepare('SELECT * FROM order_items WHERE orderId = ?').all(order.id);
      return formatOrder(order, items);
    });

    res.status(200).json(withItems);
  } catch (err) {
    next(err);
  }
}

function getOrder(req, res, next) {
  try {
    const order = getOrderWithItems(req.params.id);

    if (!order) {
      return next(new AppError('Order not found', 404));
    }

    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
}

function updateOrder(req, res, next) {
  try {
    const existing = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);

    if (!existing) {
      return next(new AppError('Order not found', 404));
    }

    const { priority, status } = req.body;

    if (priority === undefined && status === undefined) {
      return next(new AppError('Nothing to update. Provide priority and/or status', 400));
    }

    if (status !== undefined && !ALLOWED_STATUSES.includes(status)) {
      return next(new AppError(`Status must be one of: ${ALLOWED_STATUSES.join(', ')}`, 400));
    }

    let priorityPrice = existing.priorityPrice;
    let totalPrice = existing.totalPrice;

    if (priority !== undefined) {
      priorityPrice = priority ? Math.round(existing.orderPrice * PRIORITY_PERCENTAGE) : 0;
      totalPrice = existing.orderPrice + priorityPrice;
    }

    db.prepare(`
      UPDATE orders
      SET priority = @priority, status = @status, priorityPrice = @priorityPrice, totalPrice = @totalPrice
      WHERE id = @id
    `).run({
      id: req.params.id,
      priority: priority !== undefined ? (priority ? 1 : 0) : existing.priority,
      status: status !== undefined ? status : existing.status,
      priorityPrice,
      totalPrice,
    });

    res.status(200).json(getOrderWithItems(req.params.id));
  } catch (err) {
    next(err);
  }
}

module.exports = { createOrder, getOrders, getOrder, updateOrder };
