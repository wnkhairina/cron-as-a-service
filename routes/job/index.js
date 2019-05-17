const express = require('express')
const controller = require('./controller')
const router = express.Router()

router.post('/', controller.createCronJob)
router.get('/', controller.getAllCronJob)
router.get('/:id', controller.getCronJob) // IMPLEMENT
router.delete('/', controller.deleteCronJob) // NOT IMPLEMENTED


module.exports = router