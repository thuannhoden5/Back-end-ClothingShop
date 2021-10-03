const userRouter = require('express').Router();
const { isAuth } = require('../../middlewares/authmiddlewares');
const {
  validateRules,
  validateResults,
} = require('../../middlewares/validation-middlewares');
const userModel = require('./user.model');
const { createNewUser, loginUser, updateProfile } = require('./user.service');
const randomstring = require('randomstring');
const { transport } = require('../../helpers/email');

userRouter.post(
  '/register',
  validateRules('register'),
  validateResults,
  async (req, res) => {
    try {
      const user = await createNewUser(req.body);

      res.status(201).send({ success: 1, data: user });
    } catch (err) {
      res.send({ success: 0, message: err.message });
    }
  },
);

userRouter.post(
  '/login',
  validateRules('login'),
  validateResults,
  async (req, res) => {
    try {
      const { email, password, role } = req.body;

      const user = await loginUser({ email, password, role });

      res.status(200).send({ success: 1, data: user });
    } catch (err) {
      console.log(err);
      res.send({ success: 0, message: err.message });
    }
  },
);

userRouter.get('/verify', isAuth, async (req, res) => {
  try {
    res.send({ success: 1, data: req.user });
  } catch (err) {
    res.send({ success: 0, message: err.message });
  }
});

userRouter.put('/updateProfile', isAuth, async (req, res) => {
  try {
    const userId = req.user._id;

    const updates = req.body;

    const updatedUser = await updateProfile({ userId, updates });

    res.send({ success: 1, data: updatedUser });
  } catch (err) {
    console.log(err);

    res.send({ success: 0, message: err.message });
  }
});

userRouter.post('/sendNewPasswordToEmail', async (req, res) => {
  try {
    const { email } = req.body;

    const foundUser = await userModel.findOne({ email });

    if (!foundUser) {
      throw new Error('This email is not in system');
    }

    const newPassword = randomstring.generate(8);

    const message = {
      from: 'shoppingclothes.mindx.xcarrer@gmail.com',
      to: foundUser.email,
      subject: 'Your new password',
      html: `<h1>Hello your new password is <i>${newPassword}</i> </h1>`,
    };

    transport.sendMail(message);
    res.status(200).send({
      success: 1,
      message: 'Check your mail to receive new password',
    });
  } catch (err) {
    console.log(err);

    res.send({ success: 0, message: err.message });
  }
});

module.exports = userRouter;
