import { type IPaymentResult } from './IPaymentResult.js'
import { type IShippingAddress } from './IShippingAddress.js'
import { type ICart } from '../cart/ICart.js'

export interface IOrder {
  cart: ICart
  priceItems: number
  priceTax: number
  priceShipping: number
  priceTotal: number
  shippingAddress: IShippingAddress
  paymentMethod: string
  paymentResult: IPaymentResult
  isPaid: boolean
  paymentDate: Date
}
