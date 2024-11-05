const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const { data, message, error } = await AuthController.login(email, password);

  if (error) {
    res.status(500).json({
      message,
    });
    res.end();
  }

  res.status(200).json(data);
});

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const { data, message, error } = await AuthController.register(
    email,
    password
  );

  if (error) {
    res.status(500).json({
      message,
    });
    res.end();
  }

  res.status(200).json(data);
});

router.post('/logout', (req, res) => {
  res.json({ message: 'logout' });
});

module.exports = router;
