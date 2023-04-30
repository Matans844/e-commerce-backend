import express from 'express'
import {
  authUser,
  deleteUserById,
  getUserById,
  getUsers,
  registerUser
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'
import { validateId } from "../middleware/validationMiddleware.js";


const router = express.Router()

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.route('/login').post(authUser)
router
  .route('/:id')
  .delete(protect, validateId, deleteUserById)
  .get(protect, validateId, getUserById)

export default router

