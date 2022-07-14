var db=require('../config/connection')
var collection=require('../config/collection')
const bcrypt=require('bcrypt')
const { response } = require('../app')
const { Db } = require('mongodb')
var objectId=require('mongodb').ObjectId
module.exports={
    doSignup:(userData)=>{
                return new Promise(async(resolve,reject)=>{
            userData.Password=await bcrypt.hash(userData.Password,10)
            let user=await db.get().collection(collection.CUSTOMER_COLLECTION).findOne({Email:userData.Email})
            if(user){resolve({status:false})}
            else{
            db.get().collection(collection.WORKER_COLLECTION).insertOne(userData).then(response)
                resolve(userData)}
        })

    },
    doLogin:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus=false
            let response={}
            let user=await db.get().collection(collection.WORKER_COLLECTION).findOne({Email:userData.Email})
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
            let user=await db.get().collection(collection.WORKER_COLLECTION).findOne({Email:userData.Email})
            if(user)
            {
                userData.Password=await bcrypt.hash(userData.Password,10)
                db.get().collection(collection.WORKER_COLLECTION).updateOne({Email:userData.Email},{
                    $set:{
                        Password:userData.Password
                    }
                }).then(response)
                    resolve(userData)
                


            }
        })
    },
    addwork:async(work,userid,callback)=>{
        console.log(work);
        let userwork=await db.get().collection(collection.WORK_COLLECTION).findOne({user:objectId(userid)})
        
        
            let workobj={
                user:objectId(userid),
                works:work
            }
            db.get().collection(collection.WORK_COLLECTION).insertOne(workobj).then((data)=>{
                console.log(data)
                callback(data.insertedId)
            })
        }

        
        

}
