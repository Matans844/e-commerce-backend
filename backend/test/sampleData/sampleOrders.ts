import { type Order } from '../../src/types/index.js'

const order1: Order = {
  user: 'abc123',
  orderItems: [],
  shippingAddress: {
    address: 'test',
    city: 'test',
    country: 'test',
    postalCode: '123456'
  },
  orderCompositePrice: {
    priceItems: 1000,
    priceTax: 10,
    priceShipping: 0,
    priceTotal: 1010
  },
  paymentMethod: 'paypal',
  paymentResult: {
    id: 'test',
    status: 'test',
    updateDate: new Date(2020, 4, 7),
    email: 'test'
  },
  isPaid: true,
  paymentDate: new Date(2020, 4, 7)
}

const order2: Order = {
  user: 'abc1234',
  orderItems: [],
  shippingAddress: {
    address: 'test',
    city: 'test',
    country: 'test',
    postalCode: '123456'
  },
  orderCompositePrice: {
    priceItems: 100,
    priceTax: 5,
    priceShipping: 0,
    priceTotal: 105
  },
  paymentMethod: 'square',
  paymentResult: {
    id: 'test',
    status: 'test',
    updateDate: new Date(2020, 4, 8),
    email: 'test'
  },
  isPaid: true,
  paymentDate: new Date(2020, 4, 8)
}

const order3: Order = {
  user: 'abc123456',
  orderItems: [],
  shippingAddress: {
    address: 'test',
    city: 'test',
    country: 'test',
    postalCode: '123456'
  },
  orderCompositePrice: {
    priceItems: 5000,
    priceTax: 100,
    priceShipping: 0,
    priceTotal: 5100
  },
  paymentMethod: 'paypal',
  paymentResult: {
    id: 'test',
    status: 'test',
    updateDate: new Date(2020, 4, 9),
    email: 'test'
  },
  isPaid: true,
  paymentDate: new Date(2020, 4, 9)
}

const orders = [order1, order2, order3]

export default orders
