import express from 'express'
import {
  authUser,
  deleteUserById,
  getUserById,
  getUsers,
  registerUser
} from '../controllers/userController.js'
import { protect } from '../middleware/authorizationMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser).get(protect, getUsers)
router.route('/login').post(authUser)
router
  .route('/:id')
  .delete(protect, deleteUserById)
  .get(protect, getUserById)

export default router
