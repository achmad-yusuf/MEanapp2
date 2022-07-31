const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// product Schema
const productSchema = mongoose.Schema({
    productname: {
      type: String
    },
    category: {
      type: String,
      required: true
    },
    freshness: {
      type: String,
      required: true
    },
    price : {
      type: String,
      required: true
    },
    comment  : {
        type: String
      },
    date  : {
        type: String,
        required: true
      }

  });
  
 
  const Product = module.exports = mongoose.model('Product', productSchema);

 
  module.exports.addproduct = function(newProduct, callback) {
  
    newProduct.save(callback);

  }

  module.exports.getoneProduct = function( productname, callback) {
    const query = {
        productname: productname
    }
     Product.findOne(query, callback);
  
  }

  module.exports.getallProduct = function(  callback) {
     
    Product.find( callback);
        
  }
  module.exports.delproduct = function(idproduct, callback) {
    const query = {
        _id: idproduct
    }
 
    Product.deleteOne(query, callback);

  }
  module.exports.updateproduct = function(newProduct, callback) {
  //  _id: newProduct._id,
  const filter = {
    _id: newProduct._id
}
    const query = {
    
      productname : newProduct.productname ,
      category : newProduct.category ,
      freshness : newProduct.freshness,
      price : newProduct.price,
      comment  : newProduct.comment,
      date  : newProduct.date
  }
  
  Product.updateOne (filter,query,callback);

  }