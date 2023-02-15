const ProductManager = require('../dao/mongoManager/BdProductManager');



const views = async (req, res) => {
  let products = await ProductManager.getProduct();
  res.render('home', {
    products,
  });
};





module.exports = {
  views,
};
