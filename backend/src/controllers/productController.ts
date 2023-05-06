import asyncHandler from 'express-async-handler'
import { ProductModel } from '../database/models/index.js'
import { type Request, type Response } from '../types/index.js'

/**
 * @description Fetch all products
 * @route GET /api/products
 * @access Public
 */
const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const PAGE_SIZE = 10 // Number of products per page
  const { pageInput = 1 } = req.query

  // Convert page to integer
  const page = parseInt(pageInput as string)

  const count = await ProductModel.countDocuments({})
  const products = await ProductModel.find({})
    .sort({ price: -1 })
    .skip(PAGE_SIZE * (page - 1))
    .limit(PAGE_SIZE)

  if (products.length > 0) {
    res.json({
      products,
      page,
      pages: Math.ceil(count / PAGE_SIZE)
    })
  } else {
    res.status(404)
    throw new Error('No products found')
  }
})

/**
 * @description Fetch single product
 * @route GET /api/products/:id
 * @access Public
 */
const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const product = await ProductModel.findById(req.params.id)

  if (product !== null) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

/**
 * @description Delete single product by id
 * @route DELETE /api/products/:id
 * @access Private
 */
const deleteProductById = asyncHandler(async (req: Request, res: Response) => {
  const product = await ProductModel.findById(req.params.id)

  if (product !== null) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

/**
 * @description Create a new product
 * @route POST /api/products
 * @access Private
 */
const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const { name, description, price, countInStock } = req.body as {
    name: string
    description: string
    price: number
    countInStock: number
  }
  // One can always insert another item.
  // Thus, no need to check for existence in database.

  try {
    const createdProduct = await ProductModel.create({
      name,
      description,
      price,
      countInStock
    })

    void createdProduct.save()

    res.status(201).json({
      name: createdProduct.name,
      description: createdProduct.description,
      price: createdProduct.price,
      countInStock: createdProduct.countInStock
    })
  } catch (error) {
    res.status(400)
    throw new Error('Invalid product data')
  }
})

/**
 * @description Update a product by id
 * @route PUT /api/products/:id
 * @access Private/Admin
 */
const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string }
  const {
    name,
    description,
    price,
    countInStock
  } = req.body as {
    name: string
    description: string
    price: number
    countInStock: number
  }

  const product = await ProductModel.findById(id)

  if (product !== null) {
    product.name = name
    product.description = description
    product.price = price
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found.')
  }
})

export {
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProduct
}
