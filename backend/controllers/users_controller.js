const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const argon2i = require("argon2-ffi").argon2i;
const {Sequelize, QueryTypes} = require("sequelize");
const local = require("./functions.js");
global.crypto = require('crypto');

// salt generation function
function genSalt() {
	return crypto.randomBytes(16).toString("hex");
}

// an async function for the randomization scheme
async function hashing(pass, salt) {
	const buf = Buffer.from(pass);
	const suf = Buffer.from(salt);
	const options = {
		timeCost: 4,
		memoryCost: 16384,
		parallelism: 6,
		hashLength: 64,
	};
	try {
		let result = await argon2i.hash(buf, suf, options);
		return result;
	} catch (e) {
		console.log(e);
	}
}

// an async function to validate passwords, returns bool
async function validate_login(hash, pass) {
	const password = Buffer.from(pass);
	const isCorrect = await argon2i.verify(hash, password);
	console.log(isCorrect ? "Correct Password entered." : "Incorrect Password entered.");
	return isCorrect;
}

// create and save a new user
exports.create = (req,res) => {

	// first validate the request

	// do not allow empty body of req
	if(!req.body) {
		returnres.sendStatus(400);
		return;
	}
	console.log(req.body);
	//local temp salt to pass onward to creation process
	var usr_salt = genSalt();
	console.log(usr_salt);
	//hash password
	hash_and_create = hashing(req.body.pass, usr_salt)
	.then(usr_hash => {
		console.log(usr_hash);
		//create user object
		const user = {
			user_id: local.gen_id("USR"),
			user_name: (req.body.user_name).toLowerCase(),
			user_isAdmin: (req.body.user_isAdmin),
			user_enabled: (req.body.user_enabled),
			user_contactEmail: (req.body.user_contactEmail),
			user_salt: usr_salt,
			user_hash: usr_hash,
		};
		console.log(user);
		//save user in db
		User.create(user)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message
			})
		});
	})
	.catch(err => {
		res.status(500).send({
			message: err.message
		});
	});
};

// retrieve all user info from the database, minus password info (never offered via API)
exports.findAll = (req, res) => {
	User.findAll({
		attributes: [
			"user_id",
			"user_name",
			"user_isAdmin",
			"user_enabled",
			"user_contactEmail",
			"createdAt",
			"updatedAt"
		]
	})
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Error occurred while retrieving user ids."
			});
		});

};

// find one user info by user id
exports.findByPk = (req, res) => {
	const user_id = req.params.user_id;


	User.findByPk(user_id, {
		attributes: [
			"user_id",
			"user_name",
			"user_isAdmin",
			"user_enabled",
			"user_contactEmail",
			"createdAt",
			"updatedAt"
		]
	})
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Error occurred while retrieving user ids."
			});
		});

};

// retrieve all info for one user, given user name
exports.findOne = (req, res) => {
	User.findOne({
		where: { user_name : req.params.user_name},
		attributes: [
			"user_id",
			"user_name",
			"user_isAdmin",
			"user_enabled",
			"user_contactEmail",
			"createdAt",
			"updatedAt"
		]
	})
	.then(data => {
		res.send(data);
	})
	.catch(err => {
		res.status(500).send({
			message: err.message
		});
	});
};

// function for a login post evalution, returns bool
exports.login = (req, res) => {
	// do not allow empty body of request
	if(!req.body){
		returnres.status(400);
		return;
	}

	// take in data
	const login = {
		user_name: (req.body.user_name).toLowerCase(),
		pass: req.body.pass
	};

	// find hash using user name, then return true if password verifies
	User.findOne({
		where: { user_name : login.user_name },
		attributes: [ "pass_hash" ]
	})
		.then(output => {
			const usr_hash = (output.dataValues.pass_hash);
			validate_login(usr_hash, login.pass)
				.then(result => {
					res.send(result);
				})
				.catch(err => {
					res.status(500).send({
						message: err.message
					});
				});
		})
		.catch(err => {
			res.status(500).send({
				message: err.message
			});
		});

};

// Update a user by the user id
// cannot use this for password update; this function is what 'newPass' is for
exports.update = (req, res) => {
	// lots of validation in here
	// sorry for the mess
	if(!req.params.user_id){
		res.status(400).send({
			message: "empty parameters recieved."
		});
	}
	const user_id = req.params.user_id;

	if(!req.body) {
		returnres.sendStatus(400);
		return;
	}

	// RESTful APIs should use PUT to replace the entire object
	// so now we need an entire object to copy
	const user_elements = User.findByPk(user_id, {
		attributes: [
			"user_id",
			"user_name",
			"user_isAdmin",
			"user_enabled",
			"user_salt",
			"user_hash",
			"user_contactEmail",
			"createdAt",
			"updatedAt"
		]
	})
	.then(data => {
		return data;
	})
	.catch(err => {
		res.status(500).send({
			message: "Error retrieving with id: " + user_id
		});
		return;
	});

	// check body of req, if it has a field, update to that
	// otherwise, keep current information
	// certain information is immutatible, of course
	var new_user = {
		"user_id": user_elements.user_id,
		"user_name": null,
		"user_isAdmin": null,
		"user_enabled": null,
		"pass_salt": user_elements.pass_salt,
		"pass_hash": user_elements.pass_hash,
		"user_contactEmail": null,
	}

	// in-elegant process of checking each bloody
	if(!req.body.user_name || req.body.user_name == null) {
		new_user.user_name = user_elements.user_name;
	} else {
		new_user.user_name = (req.body.user_name).toLowerCase();
	}
	if(!req.body.user_isAdmin || req.body.user_isAdmin == null) {
		new_user.isAdmin = user_elements.user_isAdmin;
	} else {
		new_user.isAdmin = req.body.isAdmin;
	}
	if(!req.body.user_enabled || req.body.i == null) {
		new_user.i = user_elements.is_active;
	} else {
		new_user.is_active = req.body.is_admin;
	}
	if(!req.body.email || req.body.is_active == null ) {
		new_user.email = user_elements.email;
	} else {
		new_user.email = req.body.email;
	}
	if(!req.body.display_name) {
		new_user.display_name = user_elements.display_name;
	} else {
		new_user.display_name = req.body.display_name;
	}

	// hopefully we now have a well formed object
	User.update(new_user, {
		where: { user_id: user_id }
	})
	.then(num => {
		if (num == 1) {
			res.status(200).send({
				message: "User updated successfully."
			});
		} else {
			res.status(400).send({
				message: "Cannot update User with id="+ new_user.user_id
			});
		}
	})
	.catch(err => {
		res.status(500).send({
			message: err.message + "Error updating User with id =" + new_user.user_id
		});
	});
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
	const user_id = req.params.user_id;

	User.destroy({
		where: { user_id: user_id }
	})
	.then(num => {
		if (num == 1) {
			res.status(200).send({
				message: "User was deleted successfully!"
			});
		} else {
			res.status(400).send({
  				message: "Cannot delete user with id=" + user_id
			});
		}
	})
	.catch(err => {
		res.status(500).send({
			message: err.message + "Could not delete user with id:" + user_id
		});
	});
};

// Delete all users from the database.
exports.deleteAll = (req, res) => {
	User.destroy({
		where: {},
		truncate: false
	})
	.then( nums => {
		res.status(200).send({
			message: nums + " Users were deleted successfully!"
		});
	})
	.catch( err => {
		res.status(500).send({
			message:
			err.message || "Some error occurred while removing all users."
		});
	});
};

// Find all admin users
exports.findAllByAdmin = (req, res) => {
	User.findAll({
		where: {
			is_admin: true
		},
		attributes: [
			"user_id",
			"user_name",
			"is_admin",
			"is_active",
			"email",
			"display_name",
			"createdAt",
			"updatedAt"
		]
	})
	.then(data => {
		console.log(data);
		res.send(data);
	})
	.catch(err => {
		res.status(500).send({
			message:
			err.message || "Some error occurred while retrieving admins."
		});
	});
};

// Find only active users
exports.findAllByActive = (req, res) => {
	User.findAll({
		where: {
			is_active: true
		},
		attributes: [
			"user_id",
			"user_name",
			"is_admin",
			"is_active",
			"email",
			"display_name",
			"createdAt",
			"updatedAt"
		]
	})
	.then(data => {
		res.send(data);
	})
	.catch(err => {
		res.status(500).send({
			message:
			err.message || "Some error occured while retrieving active users."
		});
	});
};

// Update a user, by id, for a new password
exports.newPass = (req, res) => {
	//Validate input
	if(!req.params.user_id){
		res.status(400).send({
			message: "empty parameters recieved."
		});
	}
	const user_id = req.params.user_id;

	if(!req.body) {
		res.status(400).send({
			message: "no body recieved."
		});
	}
	if(!req.body.pass) {
		res.status(400).send({
			message: "no changes made."
		});
	}
	// copy current user, including password info
	const user_elements = User.findByPk(user_id, {
		attributes: [
			"user_id",
			"user_name",
			"is_admin",
			"is_active",
			"pass_salt",
			"pass_hash",
			"email",
			"display_name",
			"createdAt",
			"updatedAt"
		]
	})
	.then(data => {
		return data;
	})
	.catch(err => {
		res.status(500).send({
			message: err.message + "Error retrieving with id: " + user_id
		});
		return;
	});
	// generate a salted hash, then update user via PUT

	var new_salt = genSalt()
	hash_and_create = hashing(req.body.pass, new_salt)
        .then(new_hash => {
                const new_user = {
		"user_id": user_elements.user_id,
		"user_name": user_elements.user_name,
		"is_admin": user_elements.is_admin,
		"is_active": user_elements.is_active,
		"pass_salt": new_salt,
		"pass_hash": new_hash,
		"email": user_elements.email,
		"display_name": user_elements.display_name
		}
		//update the user via PUT
		User.update(new_user, {
			where: { user_id: user_id }
		})
		.then(num => {
			if (num == 1) {
				res.status(200).send({
					message: "User password successfully."
				});
			} else {
				res.status(400).send({
					message: "Did not update user password"
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: err.message + "Error updating user password"
			});
		});
	})
	.catch( err => {
		res.status(500).send({
			message: err.message + "Hashing failed!"
		});
	});
};
