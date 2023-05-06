import { EventEmitter } from 'events'
import { type ICartDocument, type IUserDocument } from '../documents/index.js'

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
}

export { CartEventHandler }
