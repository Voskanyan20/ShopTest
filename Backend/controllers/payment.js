const database = require('../conf/db_config')
const customOnError = require('./error')
const Stripe = require('stripe')
require('dotenv').config()
const stripe = Stripe(process.env.STRIPE_KEY)
const endpointSecret = process.env.END_POINT_SECRET

const stripePay = async (req, res) => {
  let arr = []
  req.body.data &&
    req.body.data.map(item =>
      item.basketProducts?.map(q =>
        arr.push({
          productId: item.id,
          quantity: q.quantity
        })
      )
    )
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      data: JSON.stringify(arr.length > 0 && arr)
    }
  })

  const line_items = req.body.data.map(item => {
    const quantityArr =
      item.basketProducts && item.basketProducts?.map(item => item.quantity)
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.imageUrl],
          description: item.description,
          metadata: {
            id: item.id
          }
        },
        unit_amount: item.price * 100
      },
      quantity: quantityArr[0]
    }
  })

  const session = await stripe.checkout.sessions.create({
    shipping_address_collection: {
      allowed_countries: ['US', 'CA', 'AM']
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0,
            currency: 'usd'
          },
          display_name: 'Free shipping',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 5
            },
            maximum: {
              unit: 'business_day',
              value: 7
            }
          }
        }
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 1500,
            currency: 'usd'
          },
          display_name: 'Next day air',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 1
            },
            maximum: {
              unit: 'business_day',
              value: 1
            }
          }
        }
      }
    ],
    phone_number_collection: {
      enabled: true
    },
    customer: customer.id,
    line_items,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/paySuccess`,
    cancel_url: `${process.env.CLIENT_URL}/`
  })

  res.send({ url: session.url })
}

const createOrder = (data, customer) => {
  const ordercreating = async (req, res) => {
    const productData = JSON.parse(customer.metadata.data)
    try {
      const userInfo = await database.user.findOne({
        where: {
          id: customer.metadata.userId
        }
      })
      if (productData && userInfo) {
        productData.map(async product => {
          await database.product
            .findAll({
              where: {
                id: product.productId
              }
            })
            .then(result => {
              result.map(async item => {
                const order = await database.order.create({
                  amount_total: data.amount_total / 100,
                  user_name: userInfo.dataValues.login,
                  user_id: customer.metadata.userId,
                  phone_number: customer.phone,
                  currency: data.currency,
                  customer_details: {
                    city: data.customer_details.address.city,
                    country: data.customer_details.address.country,
                    address: data.customer_details.address.line1,
                    state: data.customer_details.address.state,
                    email: data.customer_details.email
                  },
                  product_details: {
                    productName: item.dataValues.name,
                    image: item.dataValues.imageUrl,
                    price: item.dataValues.price,
                    quantity: product.quantity
                  }
                })
                if (order) {
                  console.log('Order is: ', order)
                } else {
                  throw Error('Order not created!!!')
                }
              })
            })
            .catch(err => {
              console.log(err.message)
            })
        })
      } else {
        console.log('Product or User not found')
      }
    } catch (e) {
      customOnError(req, res, e.name)
    }
  }
  return ordercreating()
}

const stripeWebHook = async (req, res) => {
  const sig = req.headers['stripe-signature']
  let data
  let eventType

  if (endpointSecret) {
    let event

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
      console.log('Webhook verified')
    } catch (err) {
      console.log(`Webhook error:, ${err.message}`)
      res.status(400).send(`Webhook Error: ${err.message}`)
      return
    }
    data = event.data.object
    eventType = event.type
  } else {
    data = req.body.data.object
    eventType = req.body.type
  }

  if (eventType === 'checkout.session.completed') {
    stripe.customers
      .retrieve(data.customer)
      .then(customer => {
        createOrder(data, customer)
      })
      .catch(err => {
        return console.log(err.message)
      })
  } else {
    console.log('Checkout session isn`t completed!!!')
  }

  res.json({ received: true })
}

module.exports = { stripePay, stripeWebHook }
