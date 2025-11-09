import express from 'express'
import cors from 'cors'
import stockRouter from './routes/stock.routes.js'

const app = express()

app.use(cors())


app.use('/api/v1/stocks', stockRouter)


export default app