var router = require('express').Router()

const UserRouter = require('./auth.routes')
const FormRouter = require('./form.routes')


router.use('/auth', UserRouter)
router.use('/form', FormRouter)
router.use('/user', UserRouter)

router.get('/', (req, res)=>{
    res.send("Router.js working fine")
})


module.exports = router;