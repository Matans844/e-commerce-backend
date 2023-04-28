import bcrypt from 'bcryptjs'
import { type User } from '../../../src/types/index.js'

const user1: User = {
  name: 'John Snow',
  email: 'john@example.com',
  password: bcrypt.hashSync('123456', 10),
  address: 'Herzliya'
}

const user2: User = {
  name: 'Jane Doe',
  email: 'Jane@Doe.com',
  password: bcrypt.hashSync('123456', 10),
  address: 'Kfar Saba'
}

const user3: User = {
  name: 'Test User',
  email: 'test@test.com',
  password: bcrypt.hashSync('123456', 10),
  address: 'North Pole'
}

const users: any[] = [user1, user2, user3]

export default users
