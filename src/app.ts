import express, { Application } from 'express';

import productRouter from './routes/product.routes';
import userRouter from './routes/user.routes';
import orderRouter from './routes/order.routes';
import authRouter from './routes/auth.routes';

const app: Application = express();

app.use(express.json());

app.use('/login', authRouter);

app.use('/products', productRouter);
app.use('/users', userRouter);
app.use('/orders', orderRouter);

export default app;
