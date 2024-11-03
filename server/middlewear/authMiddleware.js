const User = require('./models/user');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = await User.findOne({ where: { username } });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Check if the password matches
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate a token (e.g., using JWT)
  const token = generateToken(user);

  res.json({ token });
};
