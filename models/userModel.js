import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const { Schema } = mongoose

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      minlength: 2,
      maxlength: 20,
    },
    lastName: {
      type: String,
      require: true,
      trim: true,
      default: 'last name',
    },
    email: {
      type: String,
      require: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: 'Please Provide a valid Email',
      },
    },
    password: {
      type: String,
      require: true,
    },
    location: {
      type: String,
      require: true,
      default: 'lahore',
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.methods.createJwt = function () {
  return jwt.sign(
    {
      userId: this._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  )
}

const User = mongoose.model('User', userSchema)
export default User
