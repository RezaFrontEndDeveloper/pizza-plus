const db = require('../database');
const AppError = require('../utils/AppError');

function formatMenuItem(item) {
  return {
    ...item,
    soldOut: Boolean(item.soldOut),
  };
}

function getAllMenu(req, res, next) {
  try {
    const items = db.prepare('SELECT * FROM menu ORDER BY id ASC').all();
    res.status(200).json(items.map(formatMenuItem));
  } catch (err) {
    next(err);
  }
}

function getMenuItem(req, res, next) {
  try {
    const item = db.prepare('SELECT * FROM menu WHERE id = ?').get(req.params.id);

    if (!item) {
      return next(new AppError('Menu item not found', 404));
    }

    res.status(200).json(formatMenuItem(item));
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllMenu, getMenuItem };
