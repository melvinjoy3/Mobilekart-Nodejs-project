var express = require('express');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
var productHelper = require('../helpers/product-helpers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelpers.getAllProducts().then((products)=>{
    console.log(products)
    res.render('admin/view-products',{admin:true,products});
  })
  
});
router.get('/add-product',function(req,res){
  res.render('admin/add-product',{admin:true})
})
router.post('/add-product',(req,res)=>{
 
  productHelpers.addProduct(req.body,(id)=>{
    let image = req.files.Image
    
    image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
      if(!err){
        res.render('admin/add-product',{admin:true})
      }
      else{
        console.log(err);
      }
    })
    
  })
})

router.get('/delete-product/:id',(req,res)=>{
  let proId = req.params.id
  console.log(proId)
  productHelpers.deleteProduct(proId).then((response)=>{
    res.redirect('/admin/')
  })
})

router.get('/edit-product/:id',async (req,res)=>{
  let product = await productHelpers.getProductDetails(req.params.id)
  console.log(product);
  res.render('admin/edit-product',{admin:true,product})
})

router.post('/edit-product/:id',(req,res)=>{
  let id = req.params.id
  productHelpers.updateProduct(req.params.id,req.body).then(()=>{
    res.redirect('/admin')
    if(req.files.Image){
      let image = req.files.Image
      image.mv('./public/product-images/'+id+'.jpg')
    }
  })
}),
router.get('/all-users',(req,res)=>{
  // res.render('admin/all-users',{admin:true})
 productHelpers.getAllUsers().then((users)=>{
    console.log(users)
    res.render('admin/all-users',{admin:true,users});
  })
  
}),
// router.get('/all-orders',(req,res)=>{
//   // res.render('admin/all-users',{admin:true})
//  productHelpers.getAllOrders().then((orders)=>{
//     console.log(orders)
//     res.render('admin/all-users',{admin:true,orders});
//   })
  
// }),
router.get('/all-orders', (req, res, next)=> {
  productHelpers.getAllOrders().then((orders)=>{
    console.log(orders)
    res.render('admin/all-orders',{admin:true,orders});
  })
  
});


router.get('/delete-user/:id',(req,res)=>{
  let userId = req.params.id
  console.log(userId)
  productHelpers.deleteUser(userId).then((response)=>{
    res.redirect('/admin/')
  })
})
// router.get('view-feedback',(req,res)=>{
//   res.render('admin/view-feedback')
// })
router.get('/view-feedback',(req,res,next)=>{
  // res.render('admin/all-users',{admin:true})
 productHelpers.getAllFeedback().then((feed)=>{
    console.log(feed)
    res.render('admin/view-feedback',{admin:true,feed});
  })
  router.get('/delete-feedback/:id',(req,res)=>{
    let feedId = req.params.id
    console.log(feedId)
    productHelpers.deleteFeedback(feedId).then((response)=>{
      res.redirect('/admin/view-feedback/')
    })
  })
  
}),

router.get('/delete-order/:id',(req,res)=>{
  let removId=req.params.id
  console.log(removId)
  productHelper.deleteOrder(removId).then((response)=>{
    res.redirect('/admin/all-orders/')
  })
})

// router.get('/outofstock', async (req, res) => {
//   if(!req.session.userid) {
//       return res.redirect('/login');
//   }
//   const outofstocks = await productHelpers.find({quantity: 0}); // taking out of stock products, when quantity is zero.
//   res.render('admin/outofstock', {outofstocks: outofstocks}); // rendering admin/outofstock.ejs file
// })
router.get('/outofstock',(req,res)=>{
  res.render('admin/outofstock')
})
module.exports = router;  
