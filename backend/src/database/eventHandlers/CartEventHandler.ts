import { EventEmitter } from 'events'
import {type ICartDocument, type IProductDocument, type IUserDocument} from '../documents/index.js'

class CartEventHandler extends EventEmitter {
  constructor (private readonly cart: ICartDocument) {
    super()
  }

  emitCartDeleted (): void {
    this.emit('cartDeleted', this.cart)
  }

  onUserDeleted (user: IUserDocument): void {
    void this.cart.delete()
  }

  onProductDeleted = async function(product: IProductDocument) {
    try {
      await this.removeProductById(product._id)
    } catch (err) {
      console.error(`Error removing product ${product._id} from cart ${this._id}: ${err}`)
    }
  }

  onProductQuantityChanged = async function(product: IProductDocument, newQuantity: number){
    try {
      await this.changeQuantityProductById(product._id, newQuantity)
    } catch (err) {
      console.error(`Error removing product ${product._id} from cart ${this._id}: ${err}`)
    }
  }
}

export { CartEventHandler }
