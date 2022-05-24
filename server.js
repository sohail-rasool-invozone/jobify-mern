import express from 'express'
const app = express()
import dotenv from 'dotenv'

// db and routers
import connectDb from './db/db.js'
import authRouter from './router/authRouter.js'
import jobRouter from './router/jobRouter.js'

// middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'

const port = process.env.PORT || 8000
dotenv.config()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

connectDb()
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
