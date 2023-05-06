import { EventEmitter } from 'events'
import { type IProductDocument } from '../documents/index.js'

class ProductEventEmitter extends EventEmitter {
  constructor (private readonly product: IProductDocument) {
    super()
  }

  emitProductDeleted (): void {
    this.emit('productDeleted', this.product)
  }

  onProductDeleted (listener: (product: IProductDocument) => void): void {
    this.on('productDeleted', listener)
  }

  onceProductDeleted (listener: (product: IProductDocument) => void): void {
    this.on('productDeleted', listener)
  }
}

export { ProductEventEmitter }
