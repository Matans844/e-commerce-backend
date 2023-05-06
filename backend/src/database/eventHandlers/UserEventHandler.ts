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
      userId: this.user._id,
      user: this
    })

    void newCart.save()
  }
}

export { UserEventHandler }
