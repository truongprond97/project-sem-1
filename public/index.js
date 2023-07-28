const fs = require('fs')

const express = require('express');
const {join} = require("path");
const morgan = require('morgan');
const chalk  = require('chalk');

const AppError = require("../src/utils/appError");
const globalErrorHandler = require('../src/controllers/errorController');

const productRoute = require('../src/route/product')
const cartRoute = require('../src/route/cart')
const apiRoute = require('../src/route/api');
const homeRoute = require('../src/route/customer')
const { log } = require('console');
const bodyParser = require('body-parser')


const app = express();

// Define custom colors


// Custom Morgan token to add color to status code
morgan.token('colored-status', (req, res) => {

});

// Morgan middleware with colored output
const statusColors = {
  success: 'green',
  redirect: 'yellow',
  clientError: 'red',
  serverError: 'redBright',
};


const coloredStatus = (req, res) => {
  const status = res.statusCode;
  let color;
  if (status >= 500) {
    color = statusColors.serverError;
  } else if (status >= 400) {
    color = statusColors.clientError;
  } else if (status >= 300) {
    color = statusColors.redirect;
  } else {
    color = statusColors.success;
  }
  return chalk[color].bold(status);
}

/**
 * 
 * @param {Request} req 
 */
const requestData = (req) => {
  return `query = ${JSON.stringify(req.query)} ||  body = ${JSON.stringify(req.body)} || params = ${JSON.stringify(req.params)}`
}


// 1) MIDDLEWARES

// Logger
app.use(
  morgan((tokens, req, res) => {
    const method = chalk.green(tokens.method(req, res));
    const url = chalk.blue.bold(tokens.url(req, res));
    const status = coloredStatus(req, res);
    const responseTime = chalk.blueBright(tokens['response-time'](req, res) + ' ms');
    const remoteAddress = chalk.gray(tokens['remote-addr'](req, res));
    const dataRequest = chalk.yellow(requestData(req))
    return `[${method}] >> ${url} :: ${status} :: ${responseTime} :: ${remoteAddress} 
            >> Request -> ${dataRequest}
            `;
  })
);

// Parser
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());


app.use(express.json());
app.use("/assets", express.static('assets'));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES

app.get('/product', (req, res) => {
  res.status(200).render('products');
})

app.get('/contact', (req, res) => {
  res.status(200).render('contact');
})

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


app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

app.set('view engine', 'ejs');

app.use('**/**', express.static(join(__dirname, './html/404.html')));

const hostName = "127.0.0.1"
const port = process.env.PORT || 3000

app.listen(port, hostName, () => {
  console.log(
      `Server listen on port ${port}: ${"http://" + hostName + ":" + port} `,)
})

