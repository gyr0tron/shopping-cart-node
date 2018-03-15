var Product = require('../models/product');
var mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL || 'mongodb://localhost/shoppingCart')

var products = [
  new Product ({
    imagePath: 'http://via.placeholder.com/600x400',
    title: 'Product #1',
    description: 'Sample product',
    price: 99
  }),
  new Product({
    imagePath: 'http://via.placeholder.com/600x400',
    title: 'Product #2',
    description: 'Sample product',
    price: 99
  }),
  new Product({
    imagePath: 'http://via.placeholder.com/600x400',
    title: 'Product #3',
    description: 'Sample product',
    price: 99
  }),
  new Product({
    imagePath: 'http://via.placeholder.com/600x400',
    title: 'Product #4',
    description: 'Sample product',
    price: 99
  }),
  new Product({
    imagePath: 'http://via.placeholder.com/600x400',
    title: 'Product #5',
    description: 'Sample product',
    price: 99
  })
];

var done = 0;
for (var i = 0; i < products.length; i++) {
  products[i].save(function(err, result) {
    done++;
    if (done === products.length) {
      exit();
    }
  });
}
function exit() {
  mongoose.disconnect();
}