const router = require('express').Router();
const groupsController = require("../controllers/groups")

router.post("/create", groupsController.createGroup);
router.get("/all/:id", groupsController.getOneGroup),
router.use("/all", groupsController.globalGroups);
router.use("/delete/:id", groupsController.deleteOnGroup);
router.use("/update/:id", groupsController.updateOnGroup)


module.exports = router
