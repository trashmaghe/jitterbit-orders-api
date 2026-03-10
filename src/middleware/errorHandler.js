const errorHandler = (err, req, res, next) => {
  if (err.code === 11000) {
    return res.status(409).json({ success: false, message: 'Pedido com este orderId já existe.' });
  }

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ success: false, message: 'Erro de validação.', errors });
  }

  res.status(err.status || 500).json({ success: false, message: err.message || 'Erro interno do servidor.' });
};

module.exports = errorHandler;
