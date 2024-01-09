const jwt = require('jsonwebtoken')
const { secret } = require('../config')
const User = require('../models/User')

class userController{
    async profile(req, res){
        try{
            const token = req.headers.authorization
            jwt.verify(token, secret, async(err, decoded) => {
                if(err){
                    return res.status(401).json({message: 'Ошибка аунтефикации'})
                }

                const userId = decoded.id;
                const user = await User.findById(userId)

                if (!user) {
                    return res.status(404).json({message: "Пользователь не найден"})
                }

                return res.json(user)
            })
        } catch(e){
            res.status(400).json({message: 'Ошибка получения данных пользователя'})
        }
    }

    async editProfile(req, res){
        try{
            const token = req.headers.authorization
            jwt.verify(token, secret, async(err, decoded) => {
                if(err){
                    return res.status(401).json("Ошибка аунтефикации")
                } 
                const { fullName, email, phoneNumber } = req.body
                const userId = decoded.id;

                const existingUserWithEmail = await User.findOne({ email, _id: { $ne: userId } });
                if (existingUserWithEmail) {
                    return res.status(400).json({ message: "Email уже занят" });
                  }
                const existingUserWithPhone = await User.findOne({ phoneNumber, _id: { $ne: userId } });
                if (existingUserWithPhone) {
                    return res.status(400).json({ message: "Данный номер телефона уже занят" });
                }

                const updateUser = await User.findByIdAndUpdate(userId, {fullName, email, phoneNumber}, {new: true})

                res.json(updateUser)
            })
        } catch(e){
            console.error(e)
            res.status(500).json({message: 'Interval server error'})
        }
    }
}

module.exports = new userController()