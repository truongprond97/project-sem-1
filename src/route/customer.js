const express = require("express")
const router = express.Router()

const {getMessage,postMessage} = require("../controllers/customer.controller");

router.get("/", async (request, response) => {
  try {
    const messages = await getMessage()

    const options = {
      messages: messages.data.content
    }
    response.status(200).render('home', options)
  } catch (e) {
    response.status(404).render('404')
  }
});

router.post("/contact" ,async  (request, response) =>{
  try {
    const messages = await postMessage(request.body)

    response.status(200).render('contact')
  } catch (e) {
    response.status(404).render('404')
  }
});

module.exports = router