const ProductManager = require('../dao/mongoManager/BdProductManager');



const views = async (req, res) => {
  let products = await ProductManager.getProduct();
  console.log(products)
  res.render('home', {
    products,
  });
  console.log(products)
};





module.exports = {
  views,
};
