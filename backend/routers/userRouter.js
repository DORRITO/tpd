const Router = require('express')
const router = new Router()
const controller = require('../controllers/userController')

router.post('/profile', controller.profile)
router.post('/update', controller.editProfile)

module.exports = router