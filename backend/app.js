require('dotenv').config();
require('express-async-errors');

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit')

// connectDB
const connectDB = require('./db/connect')

// importing the routers
const authRouter = require('./routes/auth')
const StocksRouter = require('./routes/Stocks')
const BondsRouter = require('./routes/Bonds')
const RealEstateRouter = require('./routes/RealEstate')


// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// creating the express server
const express = require('express');
const app = express();

// implementing the rate limiter (the number of requests to be made by the user)
app.set('trust proxy', 1);
// app.use(rateLimiter({
//   windowMs: 15 * 60  * 1000, //15 minutes
//   max: 100 //limit each IP to 100 request per 15 minutes
// }))

//patch all the json data
app.use(express.json());

// implementing security packages
app.use(helmet())
app.use(cors())
app.use(xss())

// extra packages

//mapping the routers to all routes and passing a base url and the router
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/stocks', StocksRouter);
app.use('/api/v1/bonds', BondsRouter)
app.use('/api/v1/real-estate', RealEstateRouter)


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


//START THE SERVER
const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();