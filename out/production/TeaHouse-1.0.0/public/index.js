const fs = require('fs')

const express = require('express');
const {join} = require("path");
const connection = require("./db.js");

const productRoute = require('../src/route/product')
const cartRoute = require('../src/route/cart')
const apiRoute = require('../src/route/api')
const homeRoute = require('../src/route/customer')
const app = express();
const bodyParser = require('body-parser')
// 1) MIDDLEWARES
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
//
// }
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(`${__dirname}/css`));
app.use(express.static(`${__dirname}/image`));
app.use(express.static(`${__dirname}/js`));
app.use(express.static(`${__dirname}/lib`));
app.use(express.static(`${__dirname}/scss`));

app.use((req, res, next) => {
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES

app.use("/assets", express.static('assets'));

// app.get('/', (req, res) => {
//   res.status(200).render('home');
// })

app.get('/product', (req, res) => {
  connection.query('select * from product', (err, results) => {
    res.status(200).render('products');
  })
})

app.get('/contact', (req, res) => {
  res.status(200).render('contact');
})

const {getMessage,postMessage} = require("../src/controllers/customer.controller");

// app.get('/contact',(req,res)=>{
//   const {name,email,subject,message} = req.body
//   postMessage(name,email,subject,message);
//   res.status(200).render('contact');
// })


app.get('/about', (req, res) => {
  res.status(200).render('about');
})

app.get('/404', (req, res) => {
  res.status(200).render('404');
})
app.use('/contact', homeRoute)
app.use('/store', productRoute)
app.use('/cart', cartRoute)
app.use('/api', apiRoute)
app.use('/', homeRoute)


app.set('view engine', 'ejs');

const productData = require('./products.js')

app.get('/test',  (req, res) => {
  console.log("products")
  const  products= [{
    image: '../assets/img/product-1.jpg',
    imageAlt: 'Green Tea',
    title: 'Green Tea',
    description: 'Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum',

  }, {
    image: '../assets/img/product-2.jpg',
    imageAlt: 'Black Tea',
    title: 'Black Tea',
    description: 'Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum',
  }, {
    image: '../assets/img/product-3.jpg',
    imageAlt: 'Spiced Tea',
    title: 'Spiced Tea',
    description: 'Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum',
  }, {
    image: '../assets/img/product-4.jpg',
    imageAlt: 'Organic Tea',
    title: 'Organic Tea',
    description: 'Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum',
  }]
  // productData.addProduct(products)

  res.render('products', products);
});

app.use('**/**', express.static(join(__dirname, './html/404.html')));


const hostName = "127.0.0.1"
const port = 8081

app.listen(port, hostName, () => {
  console.log(
      `Server listen on port ${port}: ${"http://" + hostName + ":" + port} `,)
})

