import { EventEmitter } from 'events'
import { type IUserDocument } from '../documents/index.js'

class UserEventHandler extends EventEmitter {
  constructor (private readonly user: IUserDocument) {
    super()
  }

  emitUserDeleted (): void {
    this.emit('userDeleted', this.user._id)
  }

  onCartDeleted (cartId: string): void {
    void this.user.save()
  }
}

export { UserEventHandler }
