import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    throw new Error('Please provide all values')
  }
  const userExist = await User.findOne({ email })
  if (userExist) {
    res.status(400)
    throw new Error('User already exist')
  }
  const user = await User.create({ name, email, password })
  if (user) {
    const token = user.createJwt()
    res.status(201).json({
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
      token,
      createdAt: user.createdAt,
    })
  } else {
    res.status(400)
    throw new Error('Invalid User Data')
  }
})

const loginUser = async (req, res) => {
  res.send('login user')
}
const updateUser = async (req, res) => {
  res.send('update user')
}

export { registerUser, loginUser, updateUser }
