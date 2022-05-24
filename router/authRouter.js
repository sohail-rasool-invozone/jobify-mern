import { Router } from 'express'
let router = Router()

import {
  registerUser,
  loginUser,
  updateUser,
} from '../controller/authController.js'

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/updateUser').patch(updateUser)

export default router
