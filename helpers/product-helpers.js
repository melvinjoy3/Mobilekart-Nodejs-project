var db = require('../config/connection')
var collections = require('../config/collection')
var objectId = require('mongodb').ObjectId
const collection = require('../config/collection')
const { ObjectID } = require('mongodb')

module.exports={
    addProduct:(product,callback)=>{
        db.get().collection('product').insertOne(product).then((data)=>{
            callback(data.ops[0]._id)
        })
    },
    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products = await db.get().collection(collections.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    },
    deleteProduct:(prodId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).removeOne({_id:ObjectID(prodId)}).then((response)=>{
                console.log(response)
                resolve(response)
            })
        })
    },
    getProductDetails:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:objectId(proId)}).then((product)=>{
                resolve(product)
            })
        })
    },
    updateProduct:(proId,proDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION)
            .updateOne({_id:objectId(proId)},{
                $set:{
                    Name:proDetails.Name,
                    Category:proDetails.Category,
                    Price:proDetails.Price,
                    Description:proDetails.Description,
                    Stock:proDetails.Stock
                }
            }).then((response)=>{
                resolve()
            })
        })
    },
    getMobileProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let mobile = await db.get().collection(collections.PRODUCT_COLLECTION).find({Category: "mobile"}).toArray()
            resolve(mobile)
        })
    },
    getAccessories:()=>{
        return new Promise(async(resolve,reject)=>{
            let accessories = await db.get().collection(collections.PRODUCT_COLLECTION).find({Category: "accessories"}).toArray()
            resolve(accessories)
        })
    },
    getMobileParts:()=>{
        return new Promise(async(resolve,reject)=>{
            let parts = await db.get().collection(collections.PRODUCT_COLLECTION).find({Category: "parts"}).toArray()
            resolve(parts)
        })
    },
    getAllUsers:()=>{
        return new Promise(async(resolve,reject)=>{
            let users = await db.get().collection(collections.USER_COLLECTION).find().toArray()
            resolve(users)
        })
    },
    getAllOrders:()=>{
        return new Promise(async(resolve,reject)=>{
            let orders = await db.get().collection(collections.ORDER_COLLECTION).find().toArray()
            resolve(orders)
        })
    },
   
    deleteUser:(userId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION).removeOne({_id:ObjectID(userId)}).then((response)=>{
                console.log(response)
                resolve(response)
            })
        })
    },
    getAllFeedback:()=>{
        return new Promise(async(resolve,reject)=>{
            let feed = await db.get().collection(collections.FEEDBACK_COLLECTION).find().toArray()
            resolve(feed)
        })
    },
    deleteFeedback:(feedId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.FEEDBACK_COLLECTION).removeOne({_id:ObjectID(feedId)}).then((response)=>{
                console.log(response)
                resolve(response)
            })
        })
    },
    // deleteOrders:(orId)=>{
    //     return new Promise((resolve,reject)=>{
    //         db.get().collection(collections.ORDER_COLLECTION).removeOne({_id:ObjectID(orId)}).then((response)=>{
    //             console.log(response);
    //             resolve(response)
    //         })
    //     })
        
    // }
    deleteOrder:(removId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.ORDER_COLLECTION).removeOne({_id:objectId(removId)}).then((response)=>{
                //console.log(response);
                resolve(response)
            })
        })

    }
}




