import { Router } from 'express'
import getTest from '../controllers/main.controller.js'

const router  = Router()

router.get('/', getTest)

export default router