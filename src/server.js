require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use('/order', orderRoutes);
app.use('/auth', authRoutes);

app.get('/', (_, res) => res.status(200).json({ success: true, message: 'Jitterbit Orders API 🚀' }));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));

module.exports = app;
