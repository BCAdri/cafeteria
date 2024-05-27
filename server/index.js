const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require('./db');

const app = express();
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');  
const orderRouter = require('./routes/orderRouter');  

//const env = require('dotenv').config({path: '../.env'});

//const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

var corsOptions = {
  origin: "*"
}

app.use(cors());

//app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb' })); // Ajusta el límite según sea necesario
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

//app.use(cors(corsOptions));
app.use(
  express.json({
    verify: function (req, res, buf) {
      if (req.originalUrl.startsWith('/webhook')) {
        req.rawBody = buf.toString();
      }
    },
  })
);

app.use('/uploads', express.static('uploads'));

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Food Ordering"});
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.use('/api/', productRouter);
app.use('/api/', userRouter);
app.use('/api/', orderRouter);
