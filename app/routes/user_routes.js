module.exports = app => {
	const users = require("../controllers/users_controller.js");

	var router = require("express").Router();

	// create a new user
	router.post("/", users.create);

	// post login success or failure
	router.post("/login", users.login);

	// get all user info
	router.get("/", users.findAll);

	// get all admins users
	router.get("/admins", users.findAllByAdmin);

	// get all active users
	router.get("/active", users.findAllByActive);

	// get one user by id
	router.get("/userid/:user_id", users.findByPk);

	// get one user by name
	router.get("/username/:user_name", users.findOne);

	// put updated user info
	router.put("/update/:user_id", users.update);

	// put change to user password
	router.put("/newpass/:user_id", users.newPass);

	// delete a user
	router.delete("/:user_id", users.delete);

	// delete all users
	router.delete("/destroy", users.deleteAll);

	// finally, use the router for the app
	app.use("/api/users", router);
};
