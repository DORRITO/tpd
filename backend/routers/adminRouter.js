const Router = require('express')
const router = new Router()
const controller = require('../controllers/adminController')

router.post('/users', controller.viewUsers)
router.delete('/users/delete/:id', controller.deleteUser)

module.exports = router