import express from 'express'
import {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProduct
} from '../controllers/productController.js'
import { validateId, validatePage } from "../middleware/validationMiddleware.js";
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts).post(protect, validatePage, createProduct)
router
  .route('/:id')
  .get(validateId, getProductById)
  .delete(protect, validateId, deleteProductById)
  .put(protect, validateId, updateProduct)

export default router
