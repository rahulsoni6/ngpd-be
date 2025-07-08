import express, { Request, Response } from 'express'
import {
  createPressRelease,
  deletePressRelease,
  getAllPressReleases,
  getPressReleaseById,
  updatePressRelease,
} from '../controller/pressrelease'
import {
  uploadImage,
  // uploadPressRelease,
} from '../../../../middleware/upload.middleware'

const router = express.Router()

router.get('/', async (req: Request, res: Response): Promise<any> => {
  return res.status(200).json({ message: 'Help check' })
})
router.post('/create', uploadImage.single('image'), createPressRelease)
router.get('/get', getAllPressReleases)
router.get('/get/:id', getPressReleaseById)
router.put('/update/:id', uploadImage.single('image'), updatePressRelease)
router.delete('/delete/:id', deletePressRelease)

export default router
