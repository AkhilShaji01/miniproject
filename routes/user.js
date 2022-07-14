var express = require('express');
const customerHelper = require('../helpers/customerHelper');
var router = express.Router();
//var productHelper=require('../helpers/product-helpers')

router.get('/', function (req, res, next) {
    let user=req.session.user
    console.log(user)
    //productHelper.getAllProducts().then((products)=>{
    //console.log(products)
    
    res.render('index',{user1:true,user})
});
router.get('/loginfir',(req,res)=>{
  res.render('customer/loginfir')
})
router.get('/login', (req, res) => {
    if (req.session.loggedIn) { res.redirect('/') }
    else {

        res.render('customer/login', { "loginError": req.session.loginError })
        req.session.loginError = false
    }
})
router.get('/signup', (req, res) => {
    res.render('customer/signup',{"signuperror":req.session.signuperror})
    req.session.signuperror=false
})
router.post('/signup',(req,res)=>{
    customerHelper.doSignup(req.body).then((response)=>{
      console.log(response);
      if(response.status){
      res.render('customer/signup')}else{req.session.signuperror=true
      res.redirect('/signup')}
    })
  })
  router.post('/login',(req,res)=>{
    customerHelper.doLogin(req.body).then((response)=>{
      if(response.Status){
        req.session.loggedIn=true
        req.session.user=response.user
        res.redirect('/')
      }
      else{
        req.session.loginError=true
        res.redirect('/login')
      }
    })
  })
  router.get('/logout',(req,res)=>{
    req.session.destroy()
    res.redirect('/')
  })
  router.get('/forgot',(req,res)=>{
    res.render('customer/forgot')
  })
  router.post('/forgot',(req,res)=>{
    customerHelper.doForgot(req.body).then((response)=>{
      console.log(response)
      res.redirect('/login')
    })
  })
module.exports = router;