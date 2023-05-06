import { type ICartItem } from './ICartItem.js'

export interface ICart {
  cartItems: ICartItem[]
  quantity: number
  cartItemPrice: (item: ICartItem) => Promise<number>
  priceItems: Promise<number>
}
