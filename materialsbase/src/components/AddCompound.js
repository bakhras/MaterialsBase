import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCompound } from "../actions/compounds";
import Papa from "papaparse"; /* csv extraction */
import { Link } from "react-router-dom";

const AddCompound = () => {
	const initialCompoundState = {
		comp_index: "",
		comp_material: "",
		comp_notation: "",
		comp_mol2: "",
		comp_components: "",
		comp_properties: "",
	};

	const [compound, setCompound] = useState(initialCompoundState);
	const [submitted, setSubmitted] = useState(false);



	const dispatch = useDispatch();
	dispatch(createCompound);
	const handleInputChange = event => {
		const { name, value } = event.target;
		setCompound({ ...compound, [name]: value });

	};

	const handleFileUpload = event => {
		const { name, file } = event.target;
		setCompound({ ...compound, [name]: file });
	};

	const handleCsvUpload = event => {
		const { name, file} = event.target;
		setCompound({...compound, [name]: Papa.parse(file, {
			header: true,
			dynamicTyping: true,
			complete: function(results) {
				console.log(results);
			}
		})})
	};

	const saveCompound = () => {
		const {
			comp_index,
			comp_material,
			comp_notation,
			comp_mol2,
			comp_components,
			comp_properties
		 } = compound;

		dispatch(createCompound(
			comp_index,
			comp_material,
			comp_notation,
			comp_mol2,
			comp_components,
			comp_properties
		))
			.then(data => {
				setCompound({
					comp_index: data.comp_index,
					comp_material: data.comp_material,
					comp_notation: data.comp_notation,
					comp_mol2: data.comp_mol2,
					comp_components: data.comp_components,
					comp_properties: data.comp_properties,
        			});
        			setSubmitted(true);

        			console.log(data);
      			})
			.catch(e => {
				console.log(e);
			});
	};

	const newCompound = () => {
		setCompound(initialCompoundState);
		setSubmitted(false);
	};



  return(
	  <div className="submit-form">
	  {submitted ? (
		  <div>
			<h4>Compound data submitted succesfully!</h4>
			<button className="btn btn-success" onClick={newCompound}>Add</button>
		  	<button className="btn btn-success text-light">
		  		<Link to={"/"}>Home</Link>
		  	</button>
		  </div>
	  ) : (
		  <div>
		  	<div className="form-group">
		  		<label htmlFor="comp_index">Compound Index</label>
		 		<input
		  			type="text"
		  			className="form-control"
		  			id="comp_index"
		  			required
		  			value={compound.comp_index}
		  			onChange={handleInputChange}
		  			name="comp_index"
		  		/>
		  	</div>

		  	<div className="form-group">
		  		<label htmlFor="comp_material">Compound Material</label>
		 		<input
		  			type="text"
		  			className="form-control"
		  			id="comp_material"
		  			required
		  			value={compound.comp_material}
		  			onChange={handleInputChange}
		  			name="comp_material"
		  		/>
		  	</div>

		  	<div className="form-group">
		  		<label htmlFor="comp_notation">Compound Notation</label>
		 		<input
		  			type="text"
		  			className="form-control"
		  			id="comp_notation"
		  			required
		  			value={compound.comp_notation}
		  			onChange={handleInputChange}
		  			name="comp_notation"
		  		/>
		  	</div>

			<div className="form-group">
				<label htmlFor="comp_mol2">Compound mol2</label>
		 		<input
		  			type="file"
		  			accept=".mol2, .txt"
		  			className="form-control"
		  			id="comp_mol2"
		  			value={compound.comp_mol2}
		  			onChange={handleFileUpload}
		  			name="comp_index"
		  		/>
		  	</div>
			<div className="form-group">
		  		<label htmlFor="comp_properties">Compound Properties</label>
		  		<input
		  			type="file"
					accept=".csv, .txt"
		  			className="form-control"
		  			id="comp_properties"
		  			value={compound.comp_properties}
		  			onChange={handleCsvUpload}
		  			name="comp_properties"
		  		/>
		  	</div>
		  	<button onClick={saveCompound} className="btn btn-success mt-2">Submit</button>
		  </div>
		)}
	  </div>
	);
};

export default AddCompound;
