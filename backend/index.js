const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routers/authRouter')
const userRouter = require('./routers/userRouter')
const orderRouter = require('./routers/orderRouter')
const adminRouter = require('./routers/adminRouter')
const cors = require('cors')

const app = express()
app.use(cors())

app.use(express.json())
app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/order', orderRouter)
app.use('/admin', adminRouter)

const start = async () => {
    try{
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.k44rpzy.mongodb.net/tpdelivery?retryWrites=true&w=majority')
        app.listen(5000, () => console.log(`Сервер запущен: http://localhost:5000`))
    } catch(e){
        console.log(e)
    }
}

start()