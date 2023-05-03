import express from 'express'
import {
  getAllCarts,
  getCartById,
  deleteCartById,
  addProductById,
  deleteProductById,
  updateQuantityOfProductById
} from '../controllers/cartController.ts.js'
import { protect, admin } from '../middleware/authorizationMiddleware.js'

const router = express.Router()

router.route('/').get(protect, admin, getAllCarts)
router
  .route('/:id')
  .get(protect, getCartById)
  .delete(protect, deleteCartById)
router
  .route(':id/:productId')
  .post(protect, addProductById)
  .delete(protect, deleteProductById)
  .put(protect, updateQuantityOfProductById)
export default router
