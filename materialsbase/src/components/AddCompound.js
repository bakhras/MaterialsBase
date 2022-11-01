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

	//const handleFileUpload = event => {
	//	const { name, file } = event.target;
	//	setCompound({ ...compound, [name]: file });
	//};

	const handleCsvUpload = event => {
		const { name, file} = event.target;
		Papa.parse(document.getElementById('comp_properties').files[0], {
			header: true,
			dynamicTyping: true,
			complete: function(results) {
				setCompound({...compound, [name]: results.data[0] });
			}
		});
	};

	//Used to parse Mol2 file into Json Format
	const handleMolUpload = event => {
		const { name, file } = event.target;
		const reader = new FileReader();
		reader.readAsText(document.getElementById('comp_mol2').files[0]);
		reader.onload = () => {
			console.log(reader.result);
			//Splits the Mol file into sectioned array
			const firstSplit= (reader.result).split("@<TRIPOS>").filter( function(e) { return e.trim().length > 0; });
			console.log(firstSplit);
			//Splits Each Array into sectioned parts by line
			var splitList=[];
			for (let i=0;i<firstSplit.length;i++){
				splitList.push(firstSplit[i].split("\n"));
			}

			//console.log(splitList);

			 var mol2JSONString = '{"mol2": {'
			 for (let i=0;i<splitList.length;i++){
				if(i===0){
					mol2JSONString+=checkDataRecord(splitList[i]);
				}

				else{
					mol2JSONString+=","+checkDataRecord(splitList[i]);
					if(i===splitList.length-1){
						mol2JSONString+="}}"
						//console.log("RunTime:" +(Date.now()-currentTime).toString());
					}
				}
			}
			console.log(mol2JSONString);
			setCompound({...compound, [name]: mol2JSONString});
		};
	};


	//Checks the Data Record Type and returns the appropriate JSON string
	const checkDataRecord = (dataRecord) => {
		var recordString="";

		//If Statements to determine type of data record
		if(dataRecord[0]==="ATOM"){
			recordString+='"atom":  {"'
			for (let i = 1; i < dataRecord.length; i++) {
				if(dataRecord[i]!==""){
				if (i===1){
				recordString+=i+'": {"';
				}
				else{
					recordString+=',"'+i+'": {"';
				}
				var intsplit= dataRecord[i].split(" ").filter( function(e) { return e.trim().length > 0; } );
					recordString+='atom_id":'+'"'+intsplit[0]+'","';
					recordString+='atom_name":'+'"'+intsplit[1]+'","';
					recordString+='x":'+'"'+intsplit[2]+'","';
					recordString+='y":'+'"'+intsplit[3]+'","';
					recordString+='z":'+'"'+intsplit[4]+'","';
					recordString+='atom_type":'+'"'+intsplit[5]+'","';
					recordString+='subst_id":'+'"'+intsplit[6]+'","';
					recordString+='subst_name":'+'"'+intsplit[7]+'","';
					recordString+='charge":'+'"'+intsplit[8]+'"}';

				}
				if (i===dataRecord.length-1){
					recordString+="}";
				}

			}

		}
		else if(dataRecord[0]==="MOLECULE"){
			recordString+='"molecule":  {"'
			for (let i = 1; i < 7; i++) {
				if(i===1){
					recordString+='mol_name":'+'"'+dataRecord[i]+'","';
				}

				else if(i===2){
					intsplit=dataRecord[i].split(" ");
					recordString+='num_atoms":'+'"'+intsplit[1]+'","';
					recordString+='num_bonds":'+'"'+intsplit[2]+'","';
					recordString+='num_subst":'+'"'+intsplit[3]+'","';
					recordString+='num_feat":'+'"'+intsplit[4]+'","';
					recordString+='num_sets":'+'"'+intsplit[5]+'","';
				}

				else if (i===3){
					recordString+='mol_type":'+'"'+dataRecord[i]+'","';
				}

				else if (i===4){
					recordString+='charge_type":'+'"'+dataRecord[i]+'","';
				}

				else if (i===5){
					recordString+='status_bits":'+'"'+dataRecord[i]+'","';
				}

				else if (i===6){
					recordString+='mol_comment":'+'"'+dataRecord[i]+'"}';
				}

			}

		}
		else if(dataRecord[0]==="BOND"){
			recordString+='"bond":  {"'
			for (let i = 1; i < dataRecord.length; i++) {
				if(dataRecord[i]!==""){
					if (i===1){
						recordString+=i+'": {"';
					}

					else{
						recordString+=',"'+i+'": {"';
					}

					intsplit= dataRecord[i].split(" ").filter( function(e) { return e.trim().length > 0; } );
					recordString+='bond_id":'+'"'+intsplit[0]+'","';
					recordString+='origin_atom_id":'+'"'+intsplit[1]+'","';
					recordString+='target_atom_id":'+'"'+intsplit[2]+'","';
					recordString+='bond_type":'+'"'+intsplit[3]+'"}';


				}

				if (i===dataRecord.length-1){
					recordString+="}";
				}
			}
		}
		else {
			recordString='';
		}
		return recordString;
	}

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
			comp_properties,
		))
			.then(data => {
				console.log(data);
				setCompound({
					comp_index: data.comp_index,
					comp_material: data.comp_material,
					comp_notation: data.comp_notation,
					comp_mol2: data.comp_mol2,
					comp_components: data.comp_components,
					comp_properties: data.comp_properties,
        			});
        			setSubmitted(true);


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

			<div className="form-group" >
				<label htmlFor="comp_mol2">Compound mol2</label>
		 		<input
		  			type="file"
		  			accept=".mol2, .txt"
		  			className="form-control"
		  			id="comp_mol2"
		  			//value={compound.comp_mol2}
		  			onChange={handleMolUpload}
		  			name="comp_mol2"
		  		/>
		  	</div>
			<div className="form-group">
		  		<label htmlFor="comp_properties">Compound Properties</label>
		  		<input
		  			type="file"
					accept=".csv, .txt"
		  			className="form-control"
		  			id="comp_properties"
		  			//value={compound.comp_properties}
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
