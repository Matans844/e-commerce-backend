import { EventEmitter } from 'events'
import { type IUserDocument } from '../documents/index.js'
import { CartModel } from '../models/index.js'

class UserEventHandler extends EventEmitter {
  constructor (private readonly user: IUserDocument) {
    super()
  }

  emitUserDeleted (): void {
    this.emit('userDeleted', this.user._id)
  }

  async onCartDeleted (cartId: string): Promise<void> {
    const newCart = await CartModel.create({
      userId: this.user._id
    })

    // Set up a listener for the 'cartDeleted' event on the cart instance associated with this user
    newCart.eventHandler.on('cartDeleted', (cartId: string) => {
      // Call the delegate to handle the event
      void this.onCartDeleted(cartId)
    })

    this.user.cart = newCart._id
  }
}

export { UserEventHandler }
