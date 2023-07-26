const express = require('express')
const router = express.Router()


router.get("/", (req, res) => {
    console.log(req.session)
  res.status(200).render('cart')
})

module.exports = router
