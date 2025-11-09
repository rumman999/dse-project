import { Router } from 'express'
import getHistoricalData from '../controllers/stock.controller.js'

const router  = Router()

router.get('/historical', getHistoricalData)

export default router