const express = require("express")
const { addPropertyByAdmin, addSubPropertyByAdmin, viewAllDetailsOfProperty, createPropertyInfo, viewPropertyInfo, changePropertyStatus } = require("../controllers/adminController")
const propertyImgs = require("../middleware/propertyImage")
const upload = require('../middleware/proImage')
const router = express.Router()

router.post('/property/add', addPropertyByAdmin)
router.post('/property/sub', addSubPropertyByAdmin)
router.get('/property/info', viewAllDetailsOfProperty)
router.post('/property/saveProperty', upload.single('image'), createPropertyInfo)
router.get('/property/viewProperty', viewPropertyInfo)
router.post('/property/changeStatus', changePropertyStatus)

module.exports = router