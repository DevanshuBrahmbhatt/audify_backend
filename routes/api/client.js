const router = require("express").Router();
const ClientController = require("../../controllers/client.controller");

router.post("/create", ClientController.create);
router.get("/viewAll",ClientController.viewAll);
router.get("/view/:clientId",ClientController.view);
router.put("/update/:clientId", ClientController.update);
router.delete("/delete/:clientId", ClientController.delete);
router.post("/login", ClientController.login);


module.exports = router;
