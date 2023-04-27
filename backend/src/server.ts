import express from 'express';
import dotenv from 'dotenv';
import connectDB from '../configurations/database.js';

// Middlewares
import morgan from 'morgan';
/*import { errorHandler } from './backend/src/utils/errorHandler';*/

// Routes
/*import { accountRoutes } from './backend/src/routes/accountRoutes';
import { authRoutes } from './backend/src/routes/authRoutes';
import { productRoutes } from './backend/src/routes/productRoutes';
import { cartRoutes } from './backend/src/routes/cartRoutes';
import { checkoutRoutes } from './backend/src/routes/checkoutRoutes';*/


dotenv.config();

const server = express();
const port = process.env['PORT'] || 3000;

if (process.env['NODE_ENV'] === 'development') {
    server.use(morgan('dev'))
}

// Middleware
server.use(express.json());

// API routes
/*server.use('/api/v1/accounts', accountRoutes);
server.use('/api/v1/auth', authRoutes);
server.use('/api/v1/products', productRoutes);
server.use('/api/v1/carts', cartRoutes);
server.use('/api/v1/checkout', checkoutRoutes);*/

// Error handling middleware
/*server.use(errorHandler);*/

async function startServer() {
    // Connect to database
    await connectDB();

    server.get("/", (_, res) => {
        res.send("API IS RUNNING...");
    });

    // Start server
    server.listen(port,() => {
        console.log(`Server listening on port ${port}`);
    });
}

void startServer();
