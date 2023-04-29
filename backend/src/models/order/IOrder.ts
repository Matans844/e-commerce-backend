import { type IPaymentResult } from './IPaymentResult.js'
import { type IShippingAddress } from './IShippingAddress.js'
import { type IProductItem } from '../cart/IProductItem.js'

export interface IOrder {
  orderItems: IProductItem[]
  priceItems: number
  priceTax: number
  priceShipping: number
  priceTotal: number
  shippingAddress: IShippingAddress
  paymentMethod: string
  paymentResult: IPaymentResult
  isPaid: boolean
  paymentDate: Date
  getOrderID: () => string
  getUserID: () => string
}
