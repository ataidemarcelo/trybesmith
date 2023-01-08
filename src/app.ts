import express, { Application } from 'express';

import productRouter from './routes/product.routes';
import userRouter from './routes/user.routes';
import orderRoutes from './routes/order.routes';

const app: Application = express();

app.use(express.json());

app.use('/products', productRouter);
app.use('/users', userRouter);
app.use('/orders', orderRoutes);

export default app;
