// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path");
const Token = require('./models/token.js'); 
const { Console } = require('console');
const app = express();
const port = process.env.PORT || 8080;
const authenticateToken=require('./middlewares/authenticateToken');
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/images',express.static("uploads"));
app.use('/pimages',express.static("products"));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/wedease', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
})
  .then(() => {
    console.log('Connected to the database');
    // Start the server after successfully connecting to the database
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
  
  
// Import and use the routes
const routes = [
  require('./routes/register'),
  require('./routes/login'),
  require('./routes/newworker'),
  require('./routes/workerlogin'),
  require('./routes/fworker'),
  require('./routes/sellerRegistration'),
  require('./routes/sellerLogin'),
  require('./routes/uploadProducts'),
  require('./routes/addressData'),
  require('./routes/paymentRoutes'),
  require('./routes/workerAvailability')
];

app.use('/wedease', routes);

app.get('/wedease/log', authenticateToken, async (req, res) => {
  const authHeader = req.headers['authentication'];
  const token = authHeader && authHeader.split(' ')[1];
  const del = await Token.deleteOne({ token });
  if (del.acknowledged) {
    
    res.send({loggedOut:true})};
});

