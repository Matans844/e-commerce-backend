import { type IProduct } from '../../../src/models/index.js'

const product1: IProduct = {
  name: 'Airpods Wireless Bluetooth Headphones',
  description: 'Bluetooth technology lets you connect it with compatible devices wireless High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
  price: 89.99
}

const product2: IProduct = {
  name: 'iPhone 11 Pro 256GB Memory',
  description: 'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
  price: 599.99
}

const product3: IProduct = {
  name: 'Cannon EOS 80D DSLR Camera',
  description: 'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
  price: 929.99
}

const product4: IProduct = {
  name: 'Sony Playstation 4 Pro White Version',
  description: 'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
  price: 399.99
}

const product5: IProduct = {
  name: 'Logitech G-Series Gaming Mouse',
  description: 'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
  price: 49.99
}

const product6: IProduct = {
  name: 'Amazon Echo Dot 3rd Generation',
  description: 'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
  price: 29.99
}

const products: IProduct[] = [product1, product2, product3, product4, product5, product6]

export default products
