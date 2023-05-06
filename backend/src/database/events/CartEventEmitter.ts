import { EventEmitter } from 'events'
import { type ICartDocument } from '../documents/index.js'

class CartEventEmitter extends EventEmitter {
  constructor (private readonly cart: ICartDocument) {
    super()
  }

  emitCartDeleted (): void {
    this.emit('cartDeleted', this.cart)
  }

  onCartDeleted (listener: (cart: ICartDocument) => void): void {
    this.on('cartDeleted', listener)
  }

  onceCartDeleted (listener: (cart: ICartDocument) => void): void {
    this.once('cartDeleted', listener)
  }
}

export { CartEventEmitter }
