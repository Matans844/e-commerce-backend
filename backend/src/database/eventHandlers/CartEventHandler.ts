import { EventEmitter } from 'events'
import { type ICartDocument } from '../documents/index.js'

class CartEventHandler extends EventEmitter {
  constructor (private readonly cart: ICartDocument) {
    super()
  }

  emitCartDeleted (): void {
    this.emit('cartDeleted', this.cart._id as string)
  }

  onUserDeleted (userId: string): void {
    void this.cart.delete()
  }

  onProductDeleted = async (productId: string): Promise<void> => {
    try {
      await this.cart.deleteProductFromCartById(productId)
    } catch (err) {
      if (err instanceof Error) {
        console.error(`Error removing product ${productId} from cart ${this.cart._id as string}: ${err.message}`)
      } else {
        console.error(`Error removing product ${productId} from cart ${this.cart._id as string}: Unknown error`)
      }
    }
  }

  onProductQuantityChanged = async (productId: string, newQuantity: number): Promise<void> => {
    try {
      await this.cart.updateQuantityProductInCartById(this.cart._id as string, productId, newQuantity)
    } catch (err) {
      if (err instanceof Error) {
        console.error(`Error updating quantity of product ${productId} in cart ${this.cart._id as string}: ${err.message}`)
      } else {
        console.error(`Error updating quantity of product ${productId} in cart ${this.cart._id as string}: Unknown error`)
      }
    }
  }
}

export { CartEventHandler }
