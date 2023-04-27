import * as dotenv from "dotenv";
dotenv.config(); // See: https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import express from 'express';
import morgan from 'morgan';
import connectDB from "../configurations/database.js";

/*
import { errorHandler } from './backend/src/utils/errorHandler';
import { accountRoutes } from './backend/src/routes/accountRoutes';
import { authRoutes } from './backend/src/routes/authRoutes';
import { productRoutes } from './backend/src/routes/productRoutes';
import { cartRoutes } from './backend/src/routes/cartRoutes';
import { checkoutRoutes } from './backend/src/routes/checkoutRoutes';
*/

const server = express();
const port = process.env.PORT || 3000;

void connectDB();

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

server.get("/", (_, res) => {
    res.send("API IS RUNNING...");
});

    // Start server
server.listen(port,() => {
    console.log(`Server listening on port ${port}`);
});

