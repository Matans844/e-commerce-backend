import asyncHandler from 'express-async-handler'
import { type Request, type Response } from '../types/index.js'
import { CartModel } from '../database/models/index.js'

/**
 * @description Get all carts
 * @route GET /api/carts
 * @access Private/Admin
 *
 * TODO: Add pagination support (like for products), as list might be too long
 */
const getAllCarts = asyncHandler(async (req: Request, res: Response) => {
  const carts = await CartModel.find({})

  if (carts.length > 0) {
    res.json(carts)
  } else {
    res.status(404)
    throw new Error('No carts found')
  }
})

/**
 * @description Get a cart by id
 * @route GET /api/carts/:id
 * @access Private/Admin
 */
const getCartById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string }
  const cart = await CartModel.findById(id)

  if (cart != null) {
    res.json(cart)
  } else {
    res.status(400)
    throw new Error('Invalid cart id')
  }
})

/**
 * @description Delete a cart by id
 * @route DELETE /api/carts/:id
 * @access Private/Admin
 */
const deleteCartById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string }

  const cart = await CartModel.findById(id)
  if (cart != null) {
    await cart.remove()

    res.json({ message: 'Success: Cart removed' })
  } else {
    res.status(400)
    throw new Error('Invalid cart id')
  }
})

/**
 * @description Add product by id in cart by id
 * @route POST /api/carts/:id/:productId
 * @access Private/Admin
 */
const addProductByIdInCartById = asyncHandler(async (req: Request, res: Response) => {
  const { id, productId } = req.params as { id: string, productId: string }
  const { quantity } = req.body as { quantity?: number }
  const cartToAddTo = await CartModel.findById(id)

  if (cartToAddTo != null) {
    void cartToAddTo.addProductToCartById(productId, quantity ?? 1)

    res.json({ message: 'Success: Product added to cart' })
  } else {
    res.status(400)
    throw new Error('Invalid cart id')
  }
})

/**
 * @description Delete product by id in cart by id
 * @route DELETE /api/carts/:id/:productId
 * @access Private/Admin
 */
const deleteProductByIdInCartById = asyncHandler(async (req: Request, res: Response) => {
  const { id, productId } = req.params as { id: string, productId: string }
  const cartToAddTo = await CartModel.findById(id)

  if (cartToAddTo != null) {
    void cartToAddTo.deleteProductFromCartById(productId)

    res.json({ message: 'Success: Product deleted from cart' })
  } else {
    res.status(400)
    throw new Error('Invalid cart id')
  }
})

/**
 * @description Update product quantity by product id in cart by id
 * @route PUT /api/carts/:id/:productId
 * @access Private/Admin
 */
const updateProductQuantityByIdInCartById = asyncHandler(async (req: Request, res: Response) => {
  const { id, productId } = req.params as { id: string, productId: string }
  const { quantity } = req.body as { quantity?: number }
  const cartToAddTo = await CartModel.findById(id)

  if (cartToAddTo != null) {
    void cartToAddTo.updateQuantityProductInCartById(productId, quantity ?? 1)

    res.json({ message: 'Success: Product quantity in cart updated' })
  } else {
    res.status(400)
    throw new Error('Invalid cart id')
  }
})

/**
 * @description Get self cart
 * @route PUT /api/carts/mycart
 * @access Private
 */
const getCart = asyncHandler(async (req: Request, res: Response) => {
  const cart = req.user?.cart

  if (cart !== undefined) {
    res.json(cart)
  } else {
    res.status(500)
    throw new Error('Server error: User cart not found')
  }
})

/**
 * @description Add a product quantity by id in self cart
 * @route PUT /api/carts/mycart
 * @access Private
 *
 * TODO: Add validation for quantity (as a number)
 */
const addProductById = asyncHandler(async (req: Request, res: Response) => {
  const { productId, quantity } = req.body as {
    productId: string
    quantity: string
  }

  const validatedQuantity = parseInt(quantity) ?? 1

  if (validatedQuantity < 0) {
    throw new Error('Cannot set non-positive quantity of product in cart')
  }

  if (req.user !== undefined) {
    try {
      await req.user.cart.addProductToCartById(productId, validatedQuantity)

      res.json({ message: 'Success: Product added to cart' })
    } catch (error) {
      res.status(500)
      throw new Error('Server error: Could not add product to cart')
    }
  } else {
    res.status(500)
    throw new Error('Server error: User not found')
  }
})

/**
 * @description Delete product by id in self cart
 * @route PUT /api/carts/mycart
 * @access Private
 */
const deleteProductById = asyncHandler(async (req: Request, res: Response) => {
  const { productId } = req.body as { productId: string }

  if (req.user !== undefined) {
    try {
      const cart = await CartModel.findById(req.user._id)
      if (cart == null) {
        throw new Error('Could not get cart')
      }

      await cart.deleteProductFromCartById(productId)
      res.json({ message: 'Success: Product deleted from cart' })
    } catch (error) {
      res.status(500)
      throw new Error('Server error: Could not delete product from cart')
    }
  } else {
    res.status(500)
    throw new Error('Server error: User cart not found')
  }
})

/**
 * @description Update a product quantity in self cart
 * @route PUT /api/carts/mycart
 * @access Private
 *
 * TODO: Add validation for quantity (as a number)
 */
const updateQuantityOfProductById = asyncHandler(async (req: Request, res: Response) => {
  const { productId, quantity } = req.body as {
    productId: string
    quantity: number
  }

  if (req.user !== undefined) {
    try {
      const cart = await CartModel.findById(req.user._id)
      if (cart == null) {
        throw new Error('Could not get cart')
      }

      await cart.updateQuantityProductInCartById(productId, quantity)
      res.json({ message: 'Success: Product quantity updated' })
    } catch (error) {
      res.status(500)
      throw new Error('Server error: Could not update product in cart')
    }
  } else {
    res.status(500)
    throw new Error('Server error: User cart not found')
  }
})

export {
  getAllCarts,
  getCartById,
  deleteCartById,
  addProductByIdInCartById,
  deleteProductByIdInCartById,
  updateProductQuantityByIdInCartById,
  getCart,
  addProductById,
  deleteProductById,
  updateQuantityOfProductById
}
