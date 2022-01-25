const db = require("../models");
const Compound = db.compounds;
const Op = db.Sequelize.Op;
const {Sequelize, QueryTypes} = require("sequelize");
const local = require("./functions.js");

// create and save a new compound
exports.create = (req, res) => {
	// do not allow empty body of request
	if(!req.body) {
		returnres.sendstatus(400);
		return;
	}

	// create a compound object
	const comp = {
		comp_id: local.gen_id("CMP"),
		comp_index: (req.body.comp_index),
		comp_material: (req.body.comp_material),
		comp_notation: (req.body.comp_notation),
		comp_mol2: (req.body.comp_mol2),
		comp_components: (req.body.comp_components),
		comp_properties: (req.body.comp_properties),
	};

	Compound.create(comp)
	.then(data => {
		res.send(data);
	})
	.catch(err => {
		res.status(500).send({
			message: err.message
		});
	});
};

exports.findAll = (res) => {
	Compound.findAll()
	.then(data => {
		res.send(data);
	})
	.catch(err => {
		res.status(500).send({
			message: err.message || "Error occurred while retrieving compound ids."
		});
	});

};

exports.findOne = (req, res) => {
	const comp_index = req.params.comp_index;

	Compound.findOne({
		where: { comp_index : req.params.comp_index }
	})
	.then( data => {
		res.send(data);
	})
	.catch( err => {
		res.status(500).send({
			message: err.message || "Error retrieving with compound index: " + comp_index		})
	});
};

exports.update = (req,res) => {
	if(!req.params.comp_id) {
		res.status(400).send({
			message: "empty parameters recieved."
		});
	}

	const comp_elements = Compound.findByPk(comp_id)
	.then(data => {
		return data;
	})
	.catch(err => {
		res.status(500).send({
			message: err.message
		});
		return;
	});

	var new_compound = {
		comp_id: comp_elements.comp_id,
		comp_index: null,
		comp_material: null,
		comp_notation: null,
		comp_mol2: null,
		comp_properties: null,
	};

	if(!req.body.comp_index || req.body.comp_index == null) {
		new_compound.comp_index = comp_elements.comp_index;
	} else {
		new_compound.comp_index = req.body.comp_index;
	}
	if(!req.body.comp_material || req.body.comp_material == null) {
		new_compound.comp_material = comp_elements.comp_material;
	} else {
		new_compound.comp_material = req.body.comp_material;
	}
	if(!req.body.comp_notation || req.body.comp_notation == null) {
		new_compound.comp_notation = comp_elements.comp_notation;
	} else {
		new_compound.comp_notation = req.body.comp_material;
	}
	if(!req.body.comp_mol2 || req.body.comp_mol2 == null) {
		new_compound.comp_mol2 = comp_elements.comp_mol2;
	} else {
		new_compound.comp_mol2 = req.body.comp_mol2;
	}
	if(!req.body.comp_properties || req.body.comp_properties == null) {
		new_compound.comp_properties = comp_elements.comp_properties;
	} else {
		new_compound.comp_properties = req.body.comp_properties;
	}

	Compound.update(new_compound, {
		where: { comp_id: comp_id }
	})
	.then(num => {
		if (num == 1) {
			res.status(200).send({
				message: "Compound updated successfully."
			});
		} else {
			res.status(400).send({
				message: "Cannot update compound with id="+new_compound.comp_id
			});
		}
	})
	.catch(err => {
		res.status(500).send({
			message: err.message
		});
	});
};

// Delete a Compound with the specified id in the request
exports.delete = (req, res) => {
        const comp_id = req.params.comp_id;

        Compound.destroy({
                where: { comp_id: comp_id }
        })
        .then(num => {
                if (num == 1) {
                        res.status(200).send({
                                message: "Compound was deleted successfully!"
                        });
                } else {
                        res.status(400).send({
                                message: "Cannot delete compound with id=" + comp_id
                        });
                }
        })
        .catch(err => {
                res.status(500).send({
                        message: err.message || "Could not delete compound with id:" + comp_id
                })
        });
};


// Delete all Compounds from the database.
exports.deleteAll = (res) => {
        Compound.destroy({
                where: {},
                truncate: false
        })
        .then( nums => {
                res.status(200).send({
                        message: nums + " Compounds were deleted successfully!"
                });
        })
        .catch( err => {
                res.status(500).send({
                        message: err.message || "Some error occurred while removing all compounds."
                });
        });
};
