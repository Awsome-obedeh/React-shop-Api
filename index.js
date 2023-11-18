 require('dotenv').config();
const express= require('express');
const app=express();
const mongoose = require('mongoose');
const userRoutes=require('./routes/user')
const authRoutes=require('./routes/auth')
const productsRoutes=require('./routes/product')
const cartRoutes=require('./routes/cart')
const orderRoutes=require('./routes/order')
app.use(express.json())



main().catch(err => console.log(err));

async function main() {
  const dbConnect=await mongoose.connect(process.env.MONGO_DB_URI);
  if(dbConnect)return console.log('connected to mongoDb')


  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);
const port=2000 || process.env.PORT
app.listen(port ,()=>{
    console.log(`app is running on ${port}`);
})