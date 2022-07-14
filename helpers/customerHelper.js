var db=require('../config/connection')
var collection=require('../config/collection')
const bcrypt=require('bcrypt')
const { response, route } = require('../app')

module.exports={
    doSignup:(userData)=>{
                return new Promise(async(resolve,reject)=>{
            userData.Password=await bcrypt.hash(userData.Password,10)
            let user=await db.get().collection(collection.CUSTOMER_COLLECTION).findOne({Email:userData.Email})
            if(user){resolve({status:false})}
            else{
            db.get().collection(collection.CUSTOMER_COLLECTION).insertOne(userData).then(response)
                resolve(userData)}
        })

    },
    doLogin:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus=false
            let response={}
            let user=await db.get().collection(collection.CUSTOMER_COLLECTION).findOne({Email:userData.Email})
            if(user){
                bcrypt.compare(userData.Password,user.Password).then((status)=>{
                    if(status){
                        console.log("loginsuccess")
                        response.user=user
                        response.Status=true
                        resolve(response)
                    }
                    else{
                        console.log('loign failed')
                        resolve({status:false})
                    }
                })
            }else{
                console.log('login failed')
                resolve({status:false})
            }
        })
    },
    doForgot:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            let response={}
            let user=await db.get().collection(collection.CUSTOMER_COLLECTION).findOne({Email:userData.Email})
            if(user)
            {
                userData.Password=await bcrypt.hash(userData.Password,10)
                db.get().collection(collection.CUSTOMER_COLLECTION).updateOne({Email:userData.Email},{
                    $set:{
                        Password:userData.Password
                    }
                }).then(response)
                    resolve(userData)
                


            }
        })
    }
    

}
