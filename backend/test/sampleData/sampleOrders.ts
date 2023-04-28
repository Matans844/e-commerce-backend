import {Order} from "../../src/models/OrderModel.js";

const <Order>order1 =

const orders :  = [
  {
    user: 'abc123',
    orderItems: [],
    shippingAddress: {
      address: 'test',
      city: 'test',
      country: 'test',
      postalCode: '123456'
    },
    paymentMethod: 'paypal',
    orderCompositePrice: {
      priceItems: 1000,
      priceTax: 10,
      priceShipping: 0,
      priceTotal: 1010
    },
    isPaid: true,
    paymentDate: new Date(2020, 4, 7),
  },
  {
    user: 'abc1234',
    orderItems: [],
    shippingAddress: {
      address: 'test',
      city: 'test',
      country: 'test',
      postalCode: '123456'
    },
    paymentMethod: 'square',
    itemsPrice: 100,
    taxPrice: 5,
    shippingPrice: 0,
    totalPrice: 105,
    isPaid: true,
    paidAt: 1,
    isDelivered: true,
    deliveredAt: 2
  },
  {
    user: 'abc123456',
    orderItems: [],
    shippingAddress: {
      address: 'test',
      city: 'test',
      country: 'test',
      postalCode: '123456'
    },
    paymentMethod: 'paypal',
    itemsPrice: 5000,
    taxPrice: 100,
    shippingPrice: 0,
    totalPrice: 5100,
    isPaid: true,
    paidAt: 1,
    isDelivered: true,
    deliveredAt: 2
  }
]

export default orders
