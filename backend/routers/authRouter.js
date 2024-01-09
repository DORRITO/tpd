const Router = require('express')
const router = new Router()
const controller = require('../controllers/authController') 
const {check} = require('express-validator')

router.post('/registration', [
    check('email', "Почта не может быть пустой").notEmpty(),
    check('password', "Пароль не может быть меньше 6-ти символов, и не больше 15 символов").isLength({min: 6, max: 15})
], controller.registration)
router.post('/login', controller.login)

module.exports = router