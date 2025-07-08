import express, { Request, Response } from 'express'
import newsAndUpdatesRoute from './admin/PressRelease/routes/index'
import aboutusRoute from './admin/Aboutus/routes/index'
// import leadershipRoute from './admin/Leadership/routes/index'
import investorRoute from './admin/Lead Management/Investor Leads/routes/index'
import generalRoute from './admin/Lead Management/General Leads/routes/index'

const router = express.Router()

router.get('/', async (req: Request, res: Response): Promise<any> => {
  return res.status(200).json({ message: 'Help check' })
})

// Admin Routes
router.use('/news-updates', newsAndUpdatesRoute)
router.use('/aboutus', aboutusRoute)
// router.use('/leadership', leadershipRoute)
router.use('/lead/investor', investorRoute)
router.use('/lead/general', generalRoute)

export default router
