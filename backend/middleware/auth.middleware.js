const { verifyToken } = require('../utils/jwt');
const AppError = require('../utils/AppError');
const db = require('../database');

function protect(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('You are not logged in', 401));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    const user = db.prepare('SELECT id, fullName, phone, createdAt FROM users WHERE id = ?').get(decoded.id);

    if (!user) {
      return next(new AppError('User no longer exists', 401));
    }

    req.user = user;
    next();
  } catch (err) {
    return next(new AppError('Invalid or expired token', 401));
  }
}

module.exports = protect;
