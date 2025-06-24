import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/user.routes.js';
import sellerRouter from './routes/seller.routes.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/product.routes.js';
import cartRouter  from './routes/cart.routes.js';
import addressRouter from './routes/address.routes.js';
import orderRouter from './routes/order.routes.js';
const app = express();
const port = process.env.PORT || 4000;

await connectDB()
await connectCloudinary()

//Allow multiple origins
const allowedOrgins =['http://localhost:5173']

// Middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrgins, credentials: true}));
app.get('/', (req,res) => res.send("API is Working"));
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);



app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
    });