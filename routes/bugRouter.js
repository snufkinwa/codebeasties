
const router = require('express').Router()
const bugCtrl = require('../controllers/bugCtrl')

router.route('/')
    .get( bugCtrl.getBugs)
    .post(bugCtrl.createBug)

router.route('/:id')
    .get( bugCtrl.getBug)
    .put(bugCtrl.updateBug)
    .delete( bugCtrl.deleteBug)


module.exports = router