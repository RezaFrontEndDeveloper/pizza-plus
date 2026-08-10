const db = require('../database');
const AppError = require('../utils/AppError');

function formatUser(user) {
  return {
    id: user.id,
    fullName: user.fullName,
    phone: user.phone,
    createdAt: user.createdAt,
  };
}

function getProfile(req, res, next) {
  try {
    res.status(200).json(formatUser(req.user));
  } catch (err) {
    next(err);
  }
}

function updateProfile(req, res, next) {
  try {
    const { fullName, phone } = req.body;

    if (!fullName && !phone) {
      return next(new AppError('Provide fullName and/or phone to update', 400));
    }

    if (phone) {
      const existing = db.prepare('SELECT id FROM users WHERE phone = ? AND id != ?').get(phone, req.user.id);
      if (existing) {
        return next(new AppError('A user with this phone number already exists', 400));
      }
    }

    db.prepare(`
      UPDATE users
      SET fullName = @fullName, phone = @phone
      WHERE id = @id
    `).run({
      id: req.user.id,
      fullName: fullName || req.user.fullName,
      phone: phone || req.user.phone,
    });

    const updated = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
    res.status(200).json(formatUser(updated));
  } catch (err) {
    next(err);
  }
}

module.exports = { getProfile, updateProfile };
