import { EventEmitter } from 'events'
import { type ICartDocument } from '../documents/index.js'

class CartEventHandler extends EventEmitter {
  constructor (private readonly cart: ICartDocument) {
    super()
  }

  emitCartDeleted (): void {
    this.emit('cartDeleted', this.cart)
  }
}

export { CartEventHandler }
