const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const { secret } = require('../config')

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class authController{
  async registration(req, res){
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({message: "Ошибка при регистрации", errors})
        }

        const {fullName, phoneNumber, email, password} = req.body

        const {customer, driver} = req.body;

        if (!customer && !driver) {
            return res.status(400).json({message: "Необходимо указать значение customer или driver"});
        }

        const candidate = await User.findOne({email})

        if (candidate) {
            return res.status(400).json({message: "Такая почта уже зарегистрирована!"})
        }

        const hashPassword = bcrypt.hashSync(password, 7);
        const userRole = await Role.findOne({value: customer ? "customer" : "driver"});

        const user = new User({fullName, phoneNumber, email, password: hashPassword, roles: [userRole.value]})
        await user.save()

        const token = generateAccessToken(user._id, user.roles); // Генерируем токен

        return res.json({token, message: "Пользователь успешно зарегистрирован"})
    } catch(e) {
        console.log(e)
        res.status(400).json({message: 'Reg error'})
    }
}
      

    async login(req, res){
        try{
            const {email, password} = req.body
            const user = await User.findOne({email})
            if(!user) {
                return res.status(400).json({message: "Пользователь не найден"})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword) {
                return res.status(400).json({message: "Введен не верный пароль"})
            }
            const token = generateAccessToken(user._id, user.roles)
            return res.json({token})
        } catch(e){
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers(req, res){
        try{
            const users = await User.find()
            res.json(users)
        } catch(e){
            console.log(e)
            res.status(400).json({message: 'get user error'})
        }
    }
}

module.exports = new authController()