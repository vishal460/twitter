const express = require('express')
const app = express()
const dotenv=require('dotenv').config()
const mongoose=require('mongoose')
const morgan=require('morgan')
const bodyparser=require('body-parser')
const crypto=require('crypto')
const cookie = require('cookie')
const nonce=require('nonce')
const queryString = require('querystring')
const request = require('request-promise')
const mongooseclient=require('mongoose-client')
const expressvalidator = require('express-validator')
const port=process.env.port || 7000
const forwardingAddress="https://37492031.ngrok.io";
var path=require('path');
const whatsapps=require('./routes/twitterroutes')
const sessionStorage = require('node-sessionstorage')
const session=require('express-session')
const cookieParser=require('cookie-parser')
let cors = require('cors')


app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json())
app.use(express.static(path.join(__dirname,'public')));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat',saveUninitialized:true, resave:true, cookie: { maxAge: 180000 }}))

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}
app.use(allowCrossDomain)
const showw=(req,res,next) => {
  if(sessionStorage.getItem('clientid')!==null)
  {
  console.log("hhhhhhhhhhhhhhhhhhhhmiddleware")   
  next();
  }
}
app.use(showw)
app.set('view engine', 'ejs');
const URI="mongodb://vishal460:vishal460@cluster0-shard-00-00.rtqn9.mongodb.net:27017,cluster0-shard-00-01.rtqn9.mongodb.net:27017,cluster0-shard-00-02.rtqn9.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"

mongoose.connect(URI, { useNewUrlParser: true,useUnifiedTopology: true }).
then(()=>{
console.log(" db connected")}).catch((err)=>console.log(`eror is ${err}`))


const qwerty=(req,res,next) => {
  
  console.log("2middleware")  
  next();
  
}
app.use(qwerty) 
app.get('/show',(req,res)=>{
    res.render('tweets.ejs')
  })
  
app.use('',whatsapps)
app.use(morgan('dev'))
app.listen(port,()=>console.log(" server connected"))

