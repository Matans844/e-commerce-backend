import { type IProductItem } from './IProductItem.js'

export interface ICart {
  cartItems: IProductItem[]
  quantity: number
  price: number
}
