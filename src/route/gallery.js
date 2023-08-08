const express = require("express");
const router = express.Router();



const {getProductWithParams, mappedQueryParams} = require("../services/product.service");

router.get("/", async (request, response) => {
  try {
    const product = await getProductWithParams(mappedQueryParams(request.query))

    const options = {
      product: product.data.content
    }
    response.status(200).render('products', options)
  } catch (e) {
    response.status(404).render('404')

  }

});

module.exports = router;
