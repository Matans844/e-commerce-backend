import { type OrderItems } from './OrderItems.js'
import { type ShippingAddress } from './ShippingAddress.js'
import { type OrderCompositePrice } from './OrderCompositePrice.js'

export interface OrderUnpaid {
  user: string
  orderItems: OrderItems[]
  shippingAddress: ShippingAddress
  orderCompositePrice: OrderCompositePrice
}
