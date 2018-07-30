const express = require("express");
const router = express.Router();

const wikiController = require("../controllers/wikiController");
const validation = require("./validation");
const helper = require("../auth/helpers");

router.get("/wikis/public", wikiController.publicIndex); 
router.get("/wikis/private", wikiController.privateIndex); 
router.get("/wikis/new", wikiController.new);
router.get("/wikis/:id", wikiController.show);
router.get("/wikis/:id/edit", wikiController.edit);

router.post("/wikis/create", helper.ensureAuthenticated, wikiController.create);
router.post("/wikis/:id/destroy", wikiController.destroy);
router.post("/wikis/:id/update", wikiController.update); 

module.exports = router;
