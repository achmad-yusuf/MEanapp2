const express = require('express');
const router =express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const passport = require('passport');
const Product = require('../models/product');


// addproduct
//router.get('/addproduct', ( req, res, next) => {
//    res.send('addproduct berhasil');
//});

router.post('/addproduct', (req, res, next) => {
    //res.send('REGISTERok');
    let newProduct = new Product({
        productname : req.body.productname ,
        category : req.body.category ,
        freshness : req.body.freshness,
        price : req.body.price,
        comment  : req.body.comment,
        date  : req.body.date
    });
  
    Product.addproduct(newProduct, (err, user) => {
      if (err) {
        res.json({
          success: false,
          msg: 'Failed to add product',
        })
      } else {
        res.json({
          success: true,
          msg: 'add product success',
        })
      }
    });
});

router.post('/updateproduct/', (req, res, next) => {
  //res.send('REGISTERok');
  let newProduct = new Product({
      _id : req.body._id,
      productname : req.body.productname ,
      category : req.body.category ,
      freshness : req.body.freshness,
      price : req.body.price,
      comment  : req.body.comment,
      date  : req.body.date
  });
console.log("dari route");
  Product.updateproduct(newProduct, (err, user) => {
    if (err) {
      res.json({
        success: false,
        msg: 'Failed to add product',
      })
    } else {
      res.json({
        success: true,
        msg: 'add product success',
      })
    }
  });
});

router.get('/getoneProduct', (req, res, next) => {
    //res.send('REGISTERok');
    
  
    Product.getoneProduct( 'manggo',(err, produkku) => {
      if (err) {
        res.json({
          success: false,
          msg: 'Failed to get product',
        })
      } else {
        res.json({
          success: true,
          msg: 'get product success',
          myproduct:{
            id:produkku._id,
            productname: produkku.productname,
            category: produkku.category,
            freshness:produkku.freshness,
            price:produkku.price,
            comment:produkku.comment,
            date:produkku.date
        }
          
        })
      }
    });
});

router.get('/getallProduct', (req, res, next) => {
    //res.send('REGISTERok');
    
  
    Product.getallProduct( (err, produkku) => {
      if (err) {
        res.json({
          success: false,
          msg: 'Failed to get product',
        })
      } else {
        res.json(
         
           produkku
          
          
        )
      }
    });
});

router.post('/delproduct', (req, res, next) => {
 
    const idproduct = req.body._id;
    
    Product.delproduct(idproduct, (err, user) => {
        if(err) {
          res.json({
            success: false,
            msg: 'Failed to DEL product',
          })
        }else{
          res.json({
            success: true,
            msg: 'DEL product success'+ idproduct
          })
        }
        
    });
});

  module.exports = router;