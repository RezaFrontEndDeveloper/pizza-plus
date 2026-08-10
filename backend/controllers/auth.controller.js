const bcrypt = require('bcrypt');
const db = require('../database');
const { signToken } = require('../utils/jwt');
const AppError = require('../utils/AppError');

const SALT_ROUNDS = 10;

function formatUser(user) {
  return {
    id: user.id,
    fullName: user.fullName,
    phone: user.phone,
    createdAt: user.createdAt,
  };
}

async function register(req, res, next) {
  try {
    const { fullName, phone, password } = req.body;

    if (!fullName || !phone || !password) {
      return next(new AppError('Full name, phone and password are required', 400));
    }

    const existing = db.prepare('SELECT id FROM users WHERE phone = ?').get(phone);
    if (existing) {
      return next(new AppError('A user with this phone number already exists', 400));
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const result = db
      .prepare('INSERT INTO users (fullName, phone, password) VALUES (?, ?, ?)')
      .run(fullName, phone, hashedPassword);

    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid);
    const token = signToken({ id: user.id });

    res.status(201).json({
      token,
      user: formatUser(user),
    });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return next(new AppError('Phone and password are required', 400));
    }

    const user = db.prepare('SELECT * FROM users WHERE phone = ?').get(phone);
    if (!user) {
      return next(new AppError('Invalid phone number or password', 401));
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return next(new AppError('Invalid phone number or password', 401));
    }

    const token = signToken({ id: user.id });

    res.status(200).json({
      token,
      user: formatUser(user),
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };
