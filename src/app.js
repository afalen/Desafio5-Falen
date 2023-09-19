const express = require('express');
const mongoose = require('mongoose')
const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router');
const app = express();
const PORT = 8080;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

app.use(express.json())


const enviroment = async()=>{
    await mongoose.connect('mongodb+srv://ecommerceArmandof:falen159@cluster0.yopbtr6.mongodb.net/?retryWrites=true&w=majority')

    console.log("Conectado a la base de datos")
}

enviroment()

app.use('/', productsRouter)
app.use('/', cartsRouter)