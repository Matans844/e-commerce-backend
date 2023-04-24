import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { accountRoutes } from './backend/src/routes/accountRoutes';
import { authRoutes } from './backend/src/routes/authRoutes';
import { productRoutes } from './backend/src/routes/productRoutes';
import { cartRoutes } from './backend/src/routes/cartRoutes';
import { checkoutRoutes } from './backend/src/routes/checkoutRoutes';
import { errorHandler } from './backend/src/utils/errorHandler';
import connectDB from '../configurations/database';
import { config } from 'dotenv';

config();

const server = express();
const port = process.env['PORT'] || 5000;

// Connect to database
await connectDB();

// Middleware
server.use(express.json());
server.use(morgan('dev'));
server.use(cors());
server.use(helmet());
server.use(compression());

// API routes
server.use('/api/v1/accounts', accountRoutes);
server.use('/api/v1/auth', authRoutes);
server.use('/api/v1/products', productRoutes);
server.use('/api/v1/carts', cartRoutes);
server.use('/api/v1/checkout', checkoutRoutes);

// Error handling middleware
server.use(errorHandler);

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
