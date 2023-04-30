import express from 'express'
import {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProduct
} from '../controllers/productController.js'
import { validatePage } from '../middleware/validationMiddleware.js'
import { protect, admin } from '../middleware/authorizationMiddleware.js'

const router = express.Router()

router.route('/').get(validatePage, getProducts).post(protect, createProduct)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProductById)
  .put(protect, admin, updateProduct)

export default router
