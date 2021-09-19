const jwt = require('jsonwebtoken');
const userModel = require('../modules/user/user.model');

const isAuth = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    if (!token) throw new Error('jwt required');

    const data = jwt.verify(token, process.env.JWT_USER_SECRET);

    const { userId, role } = data;

    const foundUser = await userModel.findById(userId);

    if (!foundUser) {
      throw new Error('Not found user');
    }

    if (foundUser.role !== role) {
      throw new Error('Wrong user token');
    }

    req.user = foundUser;

    next();
  } catch (err) {
    return res.send({ success: 0, message: err.message });
  }
};

const isAdmin = async (req, res, next) => {
  const { role } = req.user;

  try {
    if (role === 'admin') {
      next();
    } else {
      throw new Error('Only admin can implement this');
    }
  } catch (err) {
    return res.send({ success: 0, message: err.message });
  }
};

module.exports = { isAuth, isAdmin };
