import express from 'express';
import { config } from 'dotenv';
import connectDB from '../configurations/database.js';
import morgan from 'morgan';
import { accountRoutes } from './backend/src/routes/accountRoutes';
import { authRoutes } from './backend/src/routes/authRoutes';
import { productRoutes } from './backend/src/routes/productRoutes';
import { cartRoutes } from './backend/src/routes/cartRoutes';
import { checkoutRoutes } from './backend/src/routes/checkoutRoutes';
import { errorHandler } from './backend/src/utils/errorHandler';

config();

const server = express();
const port = process.env['PORT'] || 3000;

// Middleware
server.use(express.json());
server.use(morgan('dev'));

// API routes
server.use('/api/v1/accounts', accountRoutes);
server.use('/api/v1/auth', authRoutes);
server.use('/api/v1/products', productRoutes);
server.use('/api/v1/carts', cartRoutes);
server.use('/api/v1/checkout', checkoutRoutes);

// Error handling middleware
server.use(errorHandler);

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
