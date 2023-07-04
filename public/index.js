const fs = require('fs')


const express = require('express');
const {join} = require("path");


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
    console.log('Hello from the middleware 👋');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// 3) ROUTES

app.use("/assets", express.static('assets'));


app.get('/', (req, res) => {
    res.status(200).sendFile(`${__dirname}/html/index.html`, 'utf-8')
})

app.get('/product', (req, res) => {
    res.status(200).sendFile(`${__dirname}/html/product.html`, 'utf-8')
})

app.get('/contact', (req, res) => {
    res.status(200).sendFile(`${__dirname}/html/contact.html`, 'utf-8')
})


app.get('/store', (req, res) => {
    res.status(200).sendFile(`${__dirname}/html/store.html`, 'utf-8')
})

app.get('/about', (req, res) => {
    res.status(200).sendFile(`${__dirname}/html/about.html`, 'utf-8')
})


app.get('/404', (req, res) => {
    res.status(200).sendFile(`${__dirname}/html/404.html`, 'utf-8')
})

// app.use(function(req, res, next) {
//     res.status(404);
//     res.json({status:404,title:"Not Found",msg:"Route not found"});
//     next();
// });

app.use('**/**',express.static(join(__dirname, './html/404.html')));



const hostName = "127.0.0.1"
const port = 8080

app.listen(port, hostName, () => {
    console.log(`Server listen on port ${port}: ${"http://" + hostName + ":" + port} `, )
})

