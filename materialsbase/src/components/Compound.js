import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
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

	const id = useParams();
	const [currentCompound, setCurrentCompound] = useState(initialCompoundState);
	const [message, setMessage] = useState("");
	const dispatch = useDispatch();
	
	const getCompound = useCallback(() => {
		CompoundDataService.get(id.comp_id)
		.then(response => {
			setCurrentCompound(response.data);
		})
		.catch(err => {
			console.log(err);
		});
	}, [id.comp_id]);

	useEffect(() => {
		getCompound();
	}, [getCompound]);

	const handleInputChange = event => {
		const { name, value } = event.target;
		setCurrentCompound({ ...currentCompound, [name]: value });
	};

	const updateContent = () => {
		dispatch(updateCompound(currentCompound.comp_id, currentCompound))
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
		{console.log(currentCompound)}
		{currentCompound ? (
				<div className="edit-form">
					<h4 style={{textAlign:"center"}}>Compound</h4>
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

				</form>
				<div style={{textAlign:"center",marginTop:"5%"}}>
				<button
					className="btn btn-danger"
					style={{marginRight:"2%"}}
					onClick={removeCompound}
					>Delete</button>
				<button
					type="Submit"
					className="btn btn-success"
					onClick={updateContent}
					>Update</button>
				</div>
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
