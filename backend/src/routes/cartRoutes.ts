/*
import express from 'express'
import {
  getAllCarts,
  getCartById,
  deleteCartById,
  addProductByIdInCartById,
  deleteProductByIdInCartById,
  updateQuantityOfProductByIdInCartById,
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
  .get(protect,admin, getAllCarts)
  .get(protect, admin, getCartById)
  .delete(protect, admin, deleteCartById)
router
  .route('/:id/:productId')
  .post(protect, admin, addProductByIdInCartById)
  .delete(protect, admin, deleteProductByIdInCartById)
  .put(protect, admin, updateQuantityOfProductByIdInCartById)
router
  .route('/mycart/:productId')
  .get(protect, getCart)
  .post(protect, addProductById)
  .delete(protect, deleteProductById)
  .put(protect, updateQuantityOfProductById)
export default router

*/
