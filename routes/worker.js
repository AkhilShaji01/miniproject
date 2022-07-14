var express = require('express');
const workerHelper = require('../helpers/workerHelper');
var router = express.Router();
router.get('/', function (req, res, next) {
    let user=req.session.user
    console.log(user)
    //productHelper.getAllProducts().then((products)=>{
    //console.log(products)
    res.render('index',{worker:true,user})
});
const verifyLogin=(req,res,next)=>{
  if(req.session.loggedIn){
    next()
  }
  else{res.redirect('/worker/login')}
  }
router.get('/login', (req, res) => {
    if (req.session.loggedIn) { res.redirect('/') }
    else {

        res.render('worker/login', { "loginError": req.session.loginError ,worker1:true})
        req.session.loginError = false
    }
})
router.get('/signup', (req, res) => {
    res.render('worker/signup',{worker1:true,"signuperror":req.session.signuperror})
    req.session.signuperror=false
})
router.post('/signup',(req,res)=>{
    workerHelper.doSignup(req.body).then((response)=>{
      console.log(response);
      if(response.status){
      res.render('worker/signup',{worker1:true})}
      else{req.session.signuperror=true
        res.redirect('/signup')}
    })
  })
  router.post('/login',(req,res)=>{
    workerHelper.doLogin(req.body).then((response)=>{
      if(response.Status){
        req.session.loggedIn=true
        req.session.user=response.user
        res.redirect('/worker')
      }
      else{
        req.session.loginError=true
        res.redirect('/login')
      }
    })
  })
  router.get('/logout',(req,res)=>{
    req.session.destroy()
    res.redirect('/worker')
  })

  router.get('/forgot',(req,res)=>{
    res.render('worker/forgot',{worker1:true})
  })
  router.post('/forgot',(req,res)=>{
    workerHelper.doForgot(req.body).then((response)=>{
      console.log(response)
      res.redirect('/worker/login')
    })
  })
  router.get('/viewWork/',(req,res)=>{
    res.render('worker/viewWork',{worker1:true})
  })
  router.get('/addwork',verifyLogin,(req,res)=>{
    res.render('worker/addwork',{worker1:true})
  })
  router.post('/addwork',(req,res)=>{
    console.log(req.body);
    console.log(req.files.image)

    workerHelper.addwork(req.body,req.session.user._id,(id)=>{
      let image=req.files.image
      console.log(data)
      
      image.mv('./public/images/work/'+id+'.png')
        
      
        
      
      
    }).then(()=>{
      res.redirect('/worker/addwork')
    })  
  })
module.exports = router;