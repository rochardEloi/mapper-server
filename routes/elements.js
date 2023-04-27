const router = require('express').Router();
const elementController = require("../controllers/elements")

router.post("/create/:group", elementController.createElement);
router.post("/update/:id", elementController.updateElement);
router.use("/delete/:id", elementController.deleteElement);
router.use("/all/:id", elementController.oneElement);
router.use("/all", elementController.allElements);

module.exports = router


