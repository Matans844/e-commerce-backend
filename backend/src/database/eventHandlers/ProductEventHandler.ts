import { EventEmitter } from 'events'
import { type IProductDocument } from '../documents/index.js'

class ProductEventHandler extends EventEmitter {
  constructor (private readonly product: IProductDocument) {
    super()
  }

  emitProductDeleted (): void {
    this.emit('productDeleted', this.product._id as string)
  }

  emitProductQuantityInStockChanged (): void {
    this.emit('productQuantityInStockChanged', this.product._id as string)
  }
}

export { ProductEventHandler }
