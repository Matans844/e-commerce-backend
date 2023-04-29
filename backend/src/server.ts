import * as dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import { connectDB } from './database/DatabaseConnector.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

/*
import { accountRoutes } from './backend/src/routes/accountRoutes';
import { authRoutes } from './backend/src/routes/authRoutes';
import { productRoutes } from './backend/src/routes/productRoutes';
import { cartRoutes } from './backend/src/routes/cartRoutes';
import { checkoutRoutes } from './backend/src/routes/checkoutRoutes';
*/

dotenv.config()

const server = express()
const port = process.env.PORT

if (process.env.NODE_ENV === 'development') {
  server.use(morgan('dev'))
}

// Middleware
server.use(express.json())

// API routes
/* server.use('/api/v1/accounts', accountRoutes);
server.use('/api/v1/auth', authRoutes);
server.use('/api/v1/products', productRoutes);
server.use('/api/v1/carts', cartRoutes);
server.use('/api/v1/checkout', checkoutRoutes); */

// Error handling middleware
/* server.use(errorHandler); */

async function startServer (): Promise<void> {
  // Connect to database
  await connectDB()

  /**
   *  Load http://localhost:5000/ in a browser to see the output of the following
   */
  server.get('/', (_, res) => {
    res.send('API IS RUNNING...')
  })

  // Start server
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })
}

void startServer()
