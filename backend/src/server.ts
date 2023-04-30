import * as dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import { connectDB } from './database/DatabaseConnector.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'

/*
import orderRoutes from "./routes/orderRoutes";
import cartRoutes from './backend/src/routes/cartRoutes';
*/

dotenv.config()
void connectDB()

const server = express()
const port = process.env.PORT

if (process.env.NODE_ENV === 'development') {
  server.use(morgan('dev'))
}

// Middleware
server.use(express.json())

server.use('/api/products', productRoutes)
server.use('/api/users', userRoutes)

// API routes
/*
server.use('/api/carts', cartRoutes);
server.use('/api/checkout', orderRoutes);
*/

if (process.env.NODE_ENV !== 'production') {
  server.get('/', (req, res) => {
    res.send('API IS RUNNING...')
  })
}

// Error handling middleware
server.use(notFound)
server.use(errorHandler)

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
