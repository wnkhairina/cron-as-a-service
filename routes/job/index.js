const express = require('express')
const controller = require('./controller')

const router = express.Router()

router.post('/', controller.createCronJob)
router.get('/', controller.getAllCronJob)
router.get('/:id', controller.getCronJob)
router.patch('/:id', controller.updateCronJobByID)
router.delete('/', controller.deleteCronJob) // NOT IMPLEMENTED
router.delete('/:id', controller.deleteCronJobByID)

module.exports = router
