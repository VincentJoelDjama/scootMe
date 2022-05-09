const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config({path: './config/.env'});

const {checkUser, requireAuth } = require('./middlewares/auth.middleware');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.json());


// jwt

app.get('/jwtid', checkUser, requireAuth, (req, res) => {
  res.status(200).json(res.locals.user.id)
});
 
// routes
const userRoutes = require('./routes/user.routes');
const bookingRoutes = require('./routes/booking.routes');

app.use('/api/user', userRoutes);
app.use('/api/booking', bookingRoutes);


//app.use('/api/post', postRoutes);

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
})