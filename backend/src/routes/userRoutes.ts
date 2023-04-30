import express from 'express'
import {
  authUser,
  deleteUserById,
  getUserById,
  getUsers,
  registerUser,
  updateUser
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authorizationMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.route('/login').post(authUser)
router
  .route('/:id')
  .delete(protect, admin, deleteUserById)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

export default router
