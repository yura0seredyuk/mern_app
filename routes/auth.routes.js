const { Router } = require('express'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = Router();

// api/auth/register
router.post(
  '/register',
  [
    check('email', 'Not correct email').isEmail(),
    check('password', 'Min length of password is 6 characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
  try {
    console.log('Auth.routers.js', req.body);
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'not correct data when register'
      })
    }

    const { email, password } = req.body;

    const candidate = await User.findOne({ email })

    if (candidate) {
      return res.status(400).json({ message: 'User with current email already exist' })
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashedPassword });

    await user.save();

    res.status(201).json({ message: 'user was created' });
    
  } catch (error) {
    res.status(500).json({ message: 'register error, try to restart' })
  }
})

// api/auth/login
router.post(
  '/login',
  [
    check('email', 'white correct email').normalizeEmail().isEmail(),
    check('password', 'white correct password').exists()
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'not correct data when login'
      })
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Password not correct' });
    }

    const token = jwt.sign(
      { userId: user.id },
      'mern app',
      { expiresIn: '1h' }
    )

    res.json({ token, userId: user.id })
  
  } catch (error) { 
    res.status(500).json({ message: 'login error, try to restart' })
  }
})

module.exports = router;
