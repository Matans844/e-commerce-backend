import { type IPaymentResult } from './IPaymentResult.js'
import { type IShippingAddress } from './IShippingAddress.js'
import { type ICartItem } from '../cart/ICartItem.js'

export interface IOrder {
  user: string
  orderItems: ICartItem[]
  shippingAddress: IShippingAddress
  priceItems: number
  priceTax: number
  priceShipping: number
  priceTotal: number
  isPaid: boolean
  paymentResult: IPaymentResult
  paymentMethod: string
  paymentDate: Date
}
