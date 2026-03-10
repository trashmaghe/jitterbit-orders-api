const jwt = require('jsonwebtoken');

const generateToken = (req, res) => {
  const { username, password } = req.body;

  if (username !== 'admin' || password !== 'admin123') {
    return res.status(401).json({ success: false, message: 'Credenciais inválidas.' });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '24h' });

  return res.status(200).json({ success: true, token, expiresIn: '24h' });
};

module.exports = { generateToken };
