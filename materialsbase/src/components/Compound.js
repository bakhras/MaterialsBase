import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateCompound, deleteCompound } from "../actions/compounds";
import CompoundService from "../services/CompoundService";
import Papa from "papaparse";


const Compound = (props) => {
	// set initial state to empty on page build to reset DOM
	const initialCompoundState = {
		comp_index: "",
		comp_material: "",
		comp_notation: "",
		comp_mol2: "",
		comp_components: null,
		comp_properties: null,
	};

	const comp_id = useParams();

	// set up initial page state
	const [currentCompound, setCurrentCompound] = useState(initialCompoundState);
	const [message, setMessage] = useState("");
	const dispatch = useDispatch();

	// grab the actual state of compound from the reducer data service
	const getCompound = (comp_id) => {
		CompoundService.get(comp_id)
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

	//const {index} = useParams();
	const mol2 = currentCompound.comp_mol2;
	const [value,setValue] = React.useState('atom');
	//const [value] = React.useState('atom');

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	const handleInputChange = (event) => {
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
			setCurrentCompound({...currentCompound});
			setMessage("The compound was updated successfully.");
		})
		.catch(err => {
			console.log(err);
		});
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
		<div className='top'>
			<div className='header'>
				<h5>Compound Summary</h5>
			</div>
			<div className='notation'>
				<h1> currentCompound.comp_notation </h1>
			</div>
			<h5 className='sub-name-left'>Properties</h5>
          		<h5 className='sub-name-right'>
				Mol2:
					<select value={value} onChange={handleChange}>
					<option value='molecular'>molecular</option>
					<option value='atom'>atom</option>
					<option value='bond'>bond</option></select>
          		</h5>
      		</div>
		<div className='bot'>
        		<div className="bot-left">
          			<table>
            				<tbody>
						<tr>
							<th>Descriptors</th>
							<th>Value</th>
						</tr>
              					{
                				Object.keys(mol2).map((item)=>(
                  					// console.log(item)
                  					<Compound
                  					type = {item}
                  					value = {mol2[item]} />
                				))
              					}
            				</tbody>
          			</table>
			</div>
			<div className='bot-right'>
				<table>
					<tbody>
						<tr>
							<th></th>
							<th></th>
        	    				</tr>
						{value === "molecular" ? Object.keys(mol2[0]).map((item)=>(
							// console.log(item)
							<Compound
							type = {item}
							value = {mol2[0][item]} />
						)) : value === "atom" ? Object.keys(mol2[1]).map((item)=>(
							// console.log(item)
							<Compound
							type = {item}
							value = {mol2[1][item]} />
						)) : Object.keys(mol2[2]).map((item)=>(
							// console.log(item)
							<Compound
							type = {item}
							value = {mol2[2][item]} />
						))}
					</tbody>
				</table>
			</div>
			<div className='bot-right-2'>
				<h4>Convert to CSV File</h4>
					<p>Select all your neccesary descriptors and click "CONVERT" to generate a CSV File with selected descriptors</p>
          			<button>CONVERT</button>
			        <h4>Download Mol2 File</h4>
		       		<p>Select all your neccesary descriptors and click "DOWNLOAD" to download a mol2 File of the compound</p>
          			<button>DOWNLOAD</button>
        		</div>
		</div>
	</div>
  )
}

export default Compound;
