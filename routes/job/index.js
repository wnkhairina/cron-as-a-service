const express = require('express')
const controller = require('./controller')
const router = express.Router()

router.post('/', controller.createCronJob)
router.get('/', controller.getAllCronJob)
router.get('/:id', controller.getCronJob)
router.patch('/:id', controller.updateCronJobByID) // or put?
router.delete('/:id', controller.deleteCronJobByID)


module.exports = router