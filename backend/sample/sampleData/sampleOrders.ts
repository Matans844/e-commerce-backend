import { type IOrder } from '../../src/types/index.js'

const order1: IOrder = {
  user: 'abc123',
  orderItems: [],
  shippingAddress: {
    address: 'test',
    city: 'test',
    country: 'test',
    postalCode: '123456'
  },
  priceItems: 1000,
  priceTax: 10,
  priceShipping: 0,
  priceTotal: 1010,
  isPaid: true,
  paymentResult: {
    id: 'test',
    status: 'test',
    update_time: new Date(2020, 4, 7),
    email_address: 'test'
  },
  paymentMethod: 'paypal',
  paymentDate: new Date(2020, 4, 7)
}

const order2: IOrder = {
  user: 'abc1234',
  orderItems: [],
  shippingAddress: {
    address: 'test',
    city: 'test',
    country: 'test',
    postalCode: '123456'
  },
  priceItems: 100,
  priceTax: 5,
  priceShipping: 0,
  priceTotal: 105,
  isPaid: true,
  paymentResult: {
    id: 'test',
    status: 'test',
    update_time: new Date(2020, 4, 8),
    email_address: 'test'
  },
  paymentMethod: 'square',
  paymentDate: new Date(2020, 4, 8)
}

const order3: IOrder = {
  user: 'abc123456',
  orderItems: [],
  shippingAddress: {
    address: 'test',
    city: 'test',
    country: 'test',
    postalCode: '123456'
  },
  priceItems: 5000,
  priceTax: 100,
  priceShipping: 0,
  priceTotal: 5100,
  isPaid: true,
  paymentResult: {
    id: 'test',
    status: 'test',
    update_time: new Date(2020, 4, 9),
    email_address: 'test'
  },
  paymentMethod: 'paypal',
  paymentDate: new Date(2020, 4, 9)
}

const orders = [order1, order2, order3]

export default orders
