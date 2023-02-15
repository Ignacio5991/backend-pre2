const {Router} = require('express')
const viewControllers = require('../controller/views.controller')

const router = Router();

router.get('/products', viewControllers.views)

module.exports = router;