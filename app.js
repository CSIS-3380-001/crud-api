const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(morgan('dev'));

// Routes
app.use('/', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server
const server = app.listen(port, () => {
    const { address, port } = server.address();
    console.log(`Server is running on http://${address}:${port}`);
});
  
module.exports = server;
