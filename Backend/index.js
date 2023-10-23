const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const database = require('./conf/db_config.js')
const control = require('./controllers/controllers')
const RateLimit = require('express-rate-limit')

const http = require('http')

database.initAssosciacion()
database.seq
  .sync({ force: false, alter: true })
  .then(() => {
    console.log('sync')
  })
  .catch(error => {
    console.log(error)
  })

const router = require('./routes/router')
const { PORT } = require('./configGlobal.js')

const apiLimiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 4000
})

app.use(cors())
app.use(apiLimiter)
app.use('/webhook', express.raw({ type: '*/*' }))
app.use(bodyParser.json())
app.use(express.json())

app.post('/login', control.user.login)

app.use(
  '/',
  router.routeUser,
  router.routeProduct,
  router.routeBasketProduct,
  router.routePayment,
  router.routeUsePayment,
  router.routerNext
)

app.listen(PORT, () => console.log(`Server started with ${PORT} port`))
