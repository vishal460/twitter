const express=require('express')
const postcontrollerss=require('../controllers/twittercontroller')
const router=express.Router();






router.get('/show',postcontrollerss.whatsappdatafetch)
router.post('/search',postcontrollerss.whatsappdatafetch)


module.exports=router;