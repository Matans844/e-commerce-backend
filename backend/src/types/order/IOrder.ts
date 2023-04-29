import { type IPaymentResult } from './IPaymentResult.js'
import { type IShippingAddress } from './IShippingAddress.js'
import { type IProductItem } from '../cart/IProductItem.js'

export interface IOrder {
  user: string
  orderItems: IProductItem[]
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
