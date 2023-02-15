const BdProductManager = require('../dao/mongoManager/BdProductManager');
const BdCartManager = require("../dao/mongoManager/BdCartManager");
const Carts = new BdCartManager();
const { find } = require("../dao/models/products.model");

const createCarts = async (req, res) => {
  const cart = req.body;
  const Createcart = await Carts.CreateCarts(cart);
  if (!Createcart.error) {
    res.json(Createcart);
  } else {
    res.json(Createcart);
  }
};

const bdgetCartId = async (req, res) => {
  const id = req.params.cid;
  const cart = await Carts.getCartsId(id);
  if (!cart.error) {
    res.json(cart);
  } else {
    res.json(cart);
  }
};

const bdgetCart = async (req, res) => {
  const cart = await Carts.getCarts();
  if (!cart.error) {
    res.json(cart);
  } else {
    res.json(cart);
  }
};

const addProductToCart = async (req, res) => {
  const { cid, pid } = req.params;
  const product = await BdProductManager.getProductId(pid);

  if (!product) {
    return res.status(400).json({
      msg: `El producto con el id ${pid} no existe`,
      ok: false,
    });
  }

  const cart = await Carts.getCartsId(cid);

  if (!cart) {
    const newCart = {
      priceTotal: product.price,
      quantityTotal: 1,
      products: [{ id: product.id,quantity:1}],
      username: cid,
    };

    const cartToSave = await Carts.addProductToCarts(newCart);

    return res.status(200).json({
      msg: 'Carrito creado con exito',
      cart: cartToSave,
    });
  }
  const findProduct = cart.products.find((product) => product.id === pid);

  if (!findProduct) {
    cart.products.push({id:product.id});
    cart.priceTotal = cart.priceTotal + product.price
    
  } else { 
    findProduct.quantity ++
    cart.priceTotal = cart.products.reduce((Acomulador, ProductoActual) => Acomulador + (product.price*ProductoActual.quantity), 0);
  }
    cart.quantityTotal = cart.quantityTotal + 1;
    const cartToUpdate = await Carts.updateCartProducts(cart);

    return res.status(201).json({
      msg: 'Producto agregado al carrito: ${cid}',
      cart: cartToUpdate,
    });
};

const deleteProductToCart = async (req, res) => {
  const { cid, pid } = req.params;
  const Cart = await Carts.getCartsId(cid);
  JSON.stringify(Cart);
  const findProductcart = Cart.products.find((prod)=>prod.id === pid); 

  if (!findProductcart) {
    return res.status(400).json({
      msg: `El producto con el id:${pid} no existe`,
      ok: false,
    });
  } else {
    if (findProductcart.quantity === 1) {
      Cart.products = Cart.products.filter((prod) => prod.id !== pid);
    } else {
      findProductcart.quantity--;
    }
    const product = await BdProductManager.getProductId(pid);
    Cart.quantityTotal = Cart.quantityTotal - 1;
    const total = Cart.products.reduce((acumulador, total) => acumulador + (product.price*total.quantity), 0);
    Cart.priceTotal = total;
    const cartToUpdate = await Carts.updateCartProducts(Cart);
    return res.status(200).json({ msg: 'Producto eliminado del carrito', cart: cartToUpdate });
  }
};
const cartUpdate = async (req,res)=>{
  const {cid, list_of_products} = req.params;
  const Cart = await Carts.getCartsId(cid)

  list_of_products.array.array.forEach(pid => {
    product = Cart.product.find((prod)=>prod.id == pid) 
    if(product)
    {
      product = pid
    } else {
      Cart.addProductToCart(pid)
    }
  });
}
const deleteToCart = async (req,res)=>{
  const {cid} = req.params;
  const Cart = await BdCartManager.getCartsId(cid);
  if  (!Cart) {
    return  res.status ( 400 ) . json ( {
    msj : "Carrito Inexistente" ,
  } )  
  }
  
    cart_products=[ ];
    cart_cantidadTotal =  0;
    cart_totalPrice =  0;
    const  cartToUpdate  =  await BdCartManager.updateToCart ( Cart )
    return  res.status ( 201 ) . json ( {
      msj : "Carrito Vaciado" ,
      Carrito : cartToUpdate
    } )  
  }




module.exports = {
  createCarts,
  bdgetCart,
  bdgetCartId,
  addProductToCart,
  deleteProductToCart,
  cartUpdate,
  deleteToCart
};
