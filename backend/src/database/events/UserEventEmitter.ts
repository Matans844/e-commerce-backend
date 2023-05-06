import { EventEmitter } from 'events'
import { type IUserDocument } from '../documents/index.js'

class UserEventEmitter extends EventEmitter {
  constructor (private readonly user: IUserDocument) {
    super()
  }

  emitUserDeleted (): void {
    this.emit('userDeleted', this.user)
  }

  onUserDeleted (listener: (user: IUserDocument) => void): void {
    this.on('userDeleted', listener)
  }

  onceCartDeleted (listener: (user: IUserDocument) => void): void {
    this.once('userDeleted', listener)
  }
}

export { UserEventEmitter }
