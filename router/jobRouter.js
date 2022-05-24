import {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  showStats,
} from '../controller/jobController.js'
import { Router } from 'express'
let router = Router()

router.route('/').post(createJob).get(getAllJobs)
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteJob).patch(updateJob)

export default router
