import bcrypt from 'bcryptjs'
import { type IUser } from '../../src/types/index.js'

const user1: IUser = {
  name: 'John Snow',
  email: 'john@example.com',
  password: bcrypt.hashSync('123456', 10),
  address: 'Herzliya',
  isAdmin: true
}

const user2: IUser = {
  name: 'Jane Doe',
  email: 'Jane@Doe.com',
  password: bcrypt.hashSync('123456', 10),
  address: 'Kfar Saba',
  isAdmin: false
}

const user3: IUser = {
  name: 'Test User',
  email: 'test@test.com',
  password: bcrypt.hashSync('123456', 10),
  address: 'North Pole',
  isAdmin: false
}

const users = [user1, user2, user3]

export default users
