var express = require('express');
var router = express.Router();
var session=require('express-session');
const mongoose=require('mongoose');
const Product=require('../modules/db.js');
const multer=require('multer');
router.get('/',(req,res)=>{
    res.render('admin/home');
});

// 使用session
router.use(session({
  secret:'secret',
  resave:true,
  saveUninitialized:false,
  cookie:{
    maxAge:1000*3000
  }
}));
//登录页面
router.get('/login',(req,res)=>{
  res.render('admin/login');
});
//管理员页面
router.get('/home',(req,res)=>{
  if(req.session.name){
  res.render('admin/home',{user:req.session.name});
  }else{
    res.redirect('login');
  }
});
//登录接口
router.post('/login',(req,res)=>{
  console.log(req.body);
  if(req.body.username=='admin@qq.com'&&req.body.psw=='123456'){
    req.session.name=req.body.username;
    res.redirect('home');
  }else{
    // res.json({code:1,msg:'登录失败'});
    // alert('用户名或者密码错误，请重新输入')
    res.redirect('login');
  }

});

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
router.get('/products/list',(req,res)=>{
    Product.find().then(data=>{
        // res.send(data);
        // console.log(data);
        res.render('products/list',{productData:data})
        // console.log(productData);
    })

});
//新增页面
router.get('/products/new',(req,res)=>{
    res.render('products/new');
});
//新增接口
router.post('/products/list',(req,res)=>{
    let product=new Product(req.body);
    console.log(product);
    product.save().then(()=>{
        res.redirect('list');
    })
    
});
//编辑页面
router.get('/products/edit',(req,res)=>{
    Product.findById(req.query.id).then((products)=>{
        res.render('products/edit',products);
    })
    

});
//编辑接口
router.post('/products/edit/:id',(req,res)=>{
    Product.findByIdAndUpdate(req.params.id,req.body).then(()=>{
        res.redirect('/admin/products/list');
    })
    
});
//删除接口
router.delete('/products/del/:id',(req,res)=>{
    Product.findByIdAndDelete(req.params.id).then(()=>{
        res.json({code:1,message:'删除成功'});
        res.send('删除成功 ');
    })

});
//文件上传
router.post('/products/upload',upload.single('awr'),function(req,res){
    //req.file是文件的信息
    //req.body将具有文本域数据
    
    res.json({ file: "/uploads/" + req.file.filename });
});


router.get('/upload',(req,res)=>{
    res.render('products/uploads');
})





module.exports=router;
