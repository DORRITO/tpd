const Router = require('express')
const router = new Router()
const controller = require('../controllers/orderController')

router.post('/create', controller.createOrder)
router.post('/view', controller.viewOrders)

module.exports = router