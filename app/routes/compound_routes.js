module.exports = app => {
	const compounds = require("../controllers/compounds_controller.js");

	var router = require("express").Router();

	// create a new compound
	router.post("/", compounds.create);

	// get all compound info
	router.get("/", compounds.findAll);

	// get one compound by id
	router.get("/:comp_id", compounds.findOne);

	// put updated compound info
	router.put("/:comp_id", compounds.update);

	// delete one compound by id
	router.delete("/:comp_id", compounds.delete);

	// delete all compounds
	router.delete("/", compounds.deleteAll);

	// finally, use the router for the app
	app.use("api/compounds", router);
};
