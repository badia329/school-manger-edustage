const bcrypt = require('bcrypt');
const User = require('../models/user'); 

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ msg: 'Invalid email or password', isLogged: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ msg: 'Invalid email or password', isLogged: false });
    }
    res.json({
      msg: 'Login success',
      isLogged: true,
      role: user.role,
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
};
