import { type IProductItem } from './IProductItem.js'

/**
 * Represents a cart.
 * Notice that interfaces cannot define private properties:
 * https://stackoverflow.com/questions/37791947/how-to-define-a-private-property-when-implementing-an-interface-in-typescript
 */
export interface ICart {
  getCartItems: () => IProductItem[]
  getCartID: () => string
  getUserID: () => string
}
