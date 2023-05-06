import { EventEmitter } from 'events'
import { type ICartDocument, type IUserDocument } from '../documents/index.js'

class UserEventHandler extends EventEmitter {
  constructor (private readonly user: IUserDocument) {
    super()
  }

  emitUserDeleted (): void {
    this.emit('userDeleted', this.user)
  }

  async onCartDeleted (cart: ICartDocument): Promise<void> {
    void this.user.save()
  }
}

export { UserEventHandler }
