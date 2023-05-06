import express from 'express'
import {
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
} from '../controllers/cartController.js'
import { protect, admin } from '../middleware/authorizationMiddleware.js'

const router = express.Router()

router.route('/').get(protect, admin, getAllCarts)

router
  .route('/:id')
  .get(protect, admin, getAllCarts)
  .get(protect, admin, getCartById)
  .delete(protect, admin, deleteCartById)

router
  .route('/:id/:productId')
  .post(protect, admin, addProductByIdInCartById)
  .delete(protect, admin, deleteProductByIdInCartById)
  .put(protect, admin, updateProductQuantityByIdInCartById)

router.route('/mycart').get(protect, getCart)

router
  .route('/mycart/:productId')
  .post(protect, addProductById)
  .delete(protect, deleteProductById)
  .put(protect, updateQuantityOfProductById)

export default router
