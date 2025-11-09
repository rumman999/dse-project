import express from 'express'
import cors from 'cors'
import stockRouter from './routes/stock.routes.js'
import authRouter from './routes/auth.routes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/stocks', stockRouter)
app.use('/api/v1/auth', authRouter)


export default app