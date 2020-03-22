var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session=require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads',express.static(path.join(__dirname, 'uploads' )));
//使用session
// app.use(session({
//   secret:'secret',
//   resave:true,
//   saveUninitialized:false,
//   cookie:{
//     maxAge:1000*3
//   }
// }));
// //登录页面
// app.get('/login',(req,res)=>{
//   res.render('login');
// });
// //管理员页面
// app.get('/home',(req,res)=>{
//   if(req.session.name){
//   res.render('home',{user:req.session.name});
//   }else{
//     res.redirect('/login');
//   }
// });
// //登录接口
// app.post('/login',(req,res)=>{
//   console.log(req.body);
//   if(req.body.username=='admin'&&req.body.psw=='123456'){
//     req.session.name=req.body.username;
//     res.redirect('/home');
//   }else{
//     res.json({code:1,msg:'登录失败'});
//   }

// });

// app.get('/login',(req,res)=>{
//   res.render('login');
// });
// app.post('/login',(req,res)=>{
//   if(req.body.username=='admin'&&req.body.psw=='123456'){
//     res.cookie('username',req.body.username);
//     res.redirect('/home');

//   }else{
//     res.render('login');


//   }
// })
// app.get('/home',(req,res)=>{
//   if(req.cookies.username){
//     res.render('home',{user:req.cookies.username});
//     // console.log(user);
    

//   }else{
//     res.redirect('/login');
//   }
 

  

// })

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/products',require('./routes/products'));
app.use('/admin',require('./routes/admin'));
// app.use('/admin/products',require('./routes/products'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
