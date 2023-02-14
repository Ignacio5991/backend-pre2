const {Router} = require('express');
const cartsControllerBd = require('../controller/carts.controller.bd')


const router =  Router();

router.post('/', cartsControllerBd.createCarts)
router.get('/', cartsControllerBd.bdgetCart)
router.get('/:cid', cartsControllerBd.bdgetCartId)
router.post('/:cid/product/:pid', cartsControllerBd.addProductToCart);
router.post('/:cid/product/:pid', cartsControllerBd.deleteProductToCart);
router.put('/api/carts/:cid',cartsControllerBd.cartUpdate);
router.delete('/api/carts/:cid',cartsControllerBd.deleteToCart)

module.exports = router;