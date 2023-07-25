const fs = require('fs')

const express = require('express');
const {join} = require("path");
const connection = require("./db.js");

const productRoute = require('../src/route/product')

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));

}

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

app.get('/', (req, res) => {

  res.status(200).render('home');
  // res.status(200).sendFile(`${__dirname}/html/index.html`, 'utf-8')
})

app.get('/product', (req, res) => {
  connection.query('select * from product', (err, results) => {
    console.log(results)
    res.status(200).render('products');
    // res.status(200).sendFile(`${__dirname}/html/product.html`, 'utf-8')
  })
  // connection().then(
  //     (val) => {
  //         val.query('select * from product', (err, results) =>  {
  //                 console.log("ok")
  //             })
  //     }
  // )

})

app.get('/contact', (req, res) => {
  res.status(200).render('contact');
  // res.status(200).sendFile(`${__dirname}/html/contact.html`, 'utf-8')
})

// app.get('/store', (req, res) => {
  
// })

app.get('/about', (req, res) => {
  res.status(200).render('about');
  // res.status(200).sendFile(`${__dirname}/html/about.html`, 'utf-8')
})

app.get('/404', (req, res) => {
  res.status(200).render('404');
  // res.status(200).sendFile(`${__dirname}/html/404.html`, 'utf-8')
})

app.use('/store', productRoute)


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

//
// connection.ping(() => {
//     console.log('alo')
// })
const hostName = "127.0.0.1"
const port = 8081

app.listen(port, hostName, () => {
  console.log(
      `Server listen on port ${port}: ${"http://" + hostName + ":" + port} `,)
})

