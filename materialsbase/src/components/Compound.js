import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCompound, deleteCompound } from "../actions/compounds";
import CompoundDataService from "../services/compound.service";

const Compound = (props) => {
	const initialCompoundState = {
		comp_index: "",
		comp_material: "",
		comp_notation: "",
		comp_mol2: "",
		comp_components: null,
		comp_properties: null,
	};

	const [currentCompound, setCurrentCompound] = useState(initialCompoundState);
	const [message, setMessage] = useState("");
	const dispatch = useDispatch();
	const getCompound = comp_id => {
		CompoundDataService.get(comp_id)
		.then(response => {
			setCurrentCompound(response.data);
			console.log(response.data);
		})
		.catch(err => {
			console.log(err);
		});
	};

	useEffect(() => {
		getCompound(props.match.params.comp_id);
	}, [props.match.params.comp_id]);

	const handleInputChange = event => {
		const { name, value } = event.target;
		setCurrentCompound({ ...currentCompound, [name]: value });
	};

	const updateStatus = status => {
		const data = {
			comp_id: currentCompound.comp_id,
			comp_index: currentCompound.comp_index,
			comp_material: currentCompound.comp_material,
			comp_notation: currentCompound.comp_notation,
			comp_mol2: currentCompound.comp_mol2,
			comp_components: currentCompound.comp_components,
			comp_properties: currentCompound.comp_properties,
		};
		dispatch(updateCompound(currentCompound.comp_id, data))
		.then(response => {
			console.log(response);
			setMessage("The compound was updated successfully.");
		})
		.catch(err => {
			console.log(err);
		});
	};

	const updateContent = () => {
		dispatch(updateCompound(currentCompound.comp_index, currentCompound))
		.then(response => {
			console.log(response);
			setMessage("The compound was updated successfully.");
		})
		.catch(err => {
			console.log(err);
		});
	};

	const removeCompound = () => {
		dispatch(deleteCompound(currentCompound.comp_id))
		.then(() => {
			props.history.push("/compounds");
		})
		.catch(err => {
			console.log(err);
		});

	};

	return (
		<div>
		{currentCompound ? (
				<div className="edit-form">
				<h4>Compound</h4>
				<form>
					<div className="form-group">
						<label htmlFor="comp_index">comp_index</label>
						<input
							type="text"
							className="form-control"
							id="comp_index"
							name="comp_index"
							value={currentCompound.comp_index}
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="comp_">comp_material</label>
						<input
							type="text"
							className="form-control"
							id="comp_material"
							name="comp_material"
							value={currentCompound.comp_material}
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="comp_notation">comp_notation</label>
						<input
							type="text"
							className="form-control"
							id="comp_notation"
							name="comp_notation"
							value={currentCompound.comp_notation}
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="comp_mol2">comp_mol2</label>
						<input
							type="text"
							className="form-control"
							id="comp_mol2"
							name="comp_mol2`"
							value={currentCompound.comp_mol2}
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="comp_components">comp_components</label>
						<input
							type="file"
							className="form-control"
							id="comp_components"
							name="comp_components"
							value={currentCompound.comp_components}
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="comp_properties">comp_properties</label>
						<input
							type="file"
							className="form-control"
							id="comp_properties"
							name="comp_properties"
							value={currentCompound.comp_properties}
							onChange={handleInputChange}
						/>
					</div>
				</form>
				<button
					className="badge badge-danger mr-2"
					onClick={removeCompound}>Delete</button>
				<button
					type="Submit"
					className="badge badge-success"
					onClick={updateContent}
				>Update</button>
				<p>{message}</p>
			</div>
			) : (
				<div>
					<br />
					<p>Please click on a compound...</p>
				</div>
		)}
		</div>
	);
};

export default Compound;
