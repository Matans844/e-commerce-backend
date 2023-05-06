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

export const usersDataWithHashedPassword = [user1, user2, user3]

const user4: IUser = {
  name: 'John Snow',
  email: 'john@example.com',
  password: '123456',
  address: 'Herzliya',
  isAdmin: true
}

const user5: IUser = {
  name: 'Jane Doe',
  email: 'Jane@Doe.com',
  password: '123456',
  address: 'Kfar Saba',
  isAdmin: false
}

const user6: IUser = {
  name: 'Test User',
  email: 'test@test.com',
  password: '123456',
  address: 'North Pole',
  isAdmin: false
}

export const usersDataWithoutHashedPassword = [user4, user5, user6]
