const User = require('../models/User')

class adminController{
    async viewUsers(req, res){
        try{
            const users = await User.find()
            res.json({
                users: users
            })
        } catch(e){
            res.staus(400).json({message: "Ошибка при получении пользователя"})
        }
    }

    async deleteUser(req, res){
        try{
            const userId = req.params.id
            await User.findByIdAndDelete(userId)
        } catch(e){
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
}

module.exports = new adminController