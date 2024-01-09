const jwt = require('jsonwebtoken')
const { secret } = require('../config')
const User = require('../models/User')
const Order = require('../models/Order')

class orderController{
    async createOrder(req, res){
        try{
            const TWO_HOURS_IN_MILLISECONDS = 2 * 60 * 60 * 1000;
            const token = req.headers.authorization
            jwt.verify(token, secret, async(err, decoded) => {
                if(err){
                    return res.status(401).json({message: 'Ошибка аунтефикации'})
                } 
                
                const userId = decoded.id;
                const user = await User.findById(userId)

                const fullName = user.fullName
                const phoneNumber = user.phoneNumber

                const customer = {fullName, phoneNumber, userId}
                const { routes, startAddress, endAddress, price, seats, dateRoute } = req.body;

                const newOrder = new Order({
                    customer,
                    routes,
                    startAddress,
                    endAddress,
                    price,
                    seats,
                    dateRoute
                })

                await newOrder.save()

                setTimeout(async () => {
                    await Order.findByIdAndDelete(newOrder._id);
                    console.log(`Order with ID ${newOrder._id} deleted after 2 hours`);
                }, TWO_HOURS_IN_MILLISECONDS);

                res.json({
                    message: "Заказ успешно создан",
                    order: newOrder
                })
            })
        } catch (e){
            res.staus(400).json({message: "Ошибка при создании заказа"})
        }
    }

    async viewOrders(req, res) {
        try{
            const orders = await Order.find()

            res.json({
                orders: orders
            })
        } catch(e){
            res.status(400).json({ message: 'Ошибка при просмотре заказов' });
        }
    }
}

module.exports = new orderController()