const router=require('express').Router();
const mongoose=require('mongoose');
const Product=require('../modules/db.js');
const multer=require('multer');
var storage = multer.diskStorage({
    //上传的文件保存地址
    destination: function(req, file, cb) {
      cb(null, "uploads");
    },
    //文件名
    filename: function(req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + file.originalname);
    }
  });
  var upload = multer({ storage: storage });

//连接mongodb
mongoose.connect('mongodb://localhost/nz1905',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log('数据库连接成功');

}).catch((err)=>{
    console.log(err);

});
//商品列表
router.get('/',(req,res)=>{
    Product.find().then(data=>{
        // res.send(data);
        // console.log(data);
        res.render('products/list',{productData:data})
        // console.log(productData);
    })

});
//新增页面
router.get('/new',(req,res)=>{
    res.render('products/new');
});
//新增接口
router.post('/',(req,res)=>{
    let product=new Product(req.body);
    console.log(product);
    product.save().then(()=>{
        res.redirect('/products');
    })
    
});
//编辑页面
router.get('/edit',(req,res)=>{
    Product.findById(req.query.id).then((products)=>{
        res.render('products/edit',products);
    })
    

});
//编辑接口
router.post('/edit/:id',(req,res)=>{
    Product.findByIdAndUpdate(req.params.id,req.body).then(()=>{
        res.redirect('/products');
    })
    
});
//删除接口
router.delete('/del/:id',(req,res)=>{
    Product.findByIdAndDelete(req.params.id).then(()=>{
        res.json({code:1,message:'删除成功'});
        res.send('删除成功 ');
    })

});
//文件上传
router.post('/upload',upload.single('awr'),function(req,res){
    //req.file是文件的信息
    //req.body将具有文本域数据
    
    res.json({ file: "/uploads/" + req.file.filename });
});


router.get('/upload',(req,res)=>{
    res.render('products/uploads');
})





module.exports=router;