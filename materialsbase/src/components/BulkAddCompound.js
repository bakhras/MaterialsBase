import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateCompound, deleteCompound } from "../actions/compounds";
import CompoundDataService from "../services/compound.service";
import { CsvToHtmlTable } from 'react-csv-to-table';
import Papa from "papaparse"; /* csv extraction */




const BulkAddCompound = () => {
	const csv= "";
	const [bulkCsv, setCSV] = useState(csv);
const handleCsvUpload = event => {
	const reader = new FileReader();
		reader.readAsText(document.getElementById('bulkCsv').files[0]);
		Papa.parse(document.getElementById('bulkCsv').files[0], {
			header: true,
			dynamicTyping: true,
			complete: function(results) {
				
				setCSV(results.data);
				console.log(bulkCsv);
				
				
			}
		});
		

	
};

const addRows = () => {
	for(let x=0;x< bulkCsv.length;x++){
	console.log(bulkCsv);
	//creates a new row element
	let row = document.createElement("tr");
	 row.id="row"+x;
	//creates a new column element
	let column1 = document.createElement("td");
	
	//create text for the column element
	const column1text = document.createTextNode(bulkCsv[x]["Compound Index"]);
	//appends the text to the column element
	column1.appendChild(column1text);
	let column2 = document.createElement("td");

	const column2text = document.createTextNode(bulkCsv[x]["Compound Material"]);
	column2.appendChild(column2text);

	let column3 = document.createElement("td");

	const column3text = document.createTextNode(bulkCsv[x]["Compound Notation"]);
	
	column3.appendChild(column3text);
	
	let column4 = document.createElement("td");

	var column4input = document.createElement("input");
		column4input.type="file";
		column4input.id="mol2_"+x;
		column4input.accept=".mol2, .txt";
	column4.appendChild(column4input);

	let column5 = document.createElement("td");

	var column5input = document.createElement("input");
		column5input.type="file";
		column5input.id="properties_"+x;
		column5input.accept=".csv, .txt";
	column5.appendChild(column5input);

	//appends the first column to the new row
	row.appendChild(column1);
	
	//appends the second column to the new row
	row.appendChild(column2);

	//appends the second column to the new row
	row.appendChild(column3);

	row.appendChild(column4);

	row.appendChild(column5);
	
	//appends the row to the table
	document.querySelector("#main-table").appendChild(row);
	}
	};

const uploadRow= (rowNum) =>{
	
};

const handlePropertyUpload=(rowNum)  => {
	
	Papa.parse(document.getElementById('properties_'+rowNum).files[0], {
		header: true,
		dynamicTyping: true,
		complete: function(results) {
			
		}
	});
};

//Used to parse Mol2 file into Json Format
const handleMolUpload = (rowNum) => {
	
	const reader = new FileReader();
	reader.readAsText(document.getElementById('mol2_'+rowNum).files[0]);
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
const uploadCompounds= () =>{

};
	

	return (
		<><div className="form-group">
			<label htmlFor="comp_mol2">Compounds CSV Here</label>
			<input
				type="file"
				accept=".csv, .txt"
				className="form-control"
				id="bulkCsv"
				onChange={handleCsvUpload}
				
				 />
				 <center>
				<button className="btn btn-success" onClick={addRows}>Add CSV</button>
				</center>
		</div>
		<div class="table-wrapper">
    
	<table id="main-table" className="fl-table">
  <tr>
    <th>Compound Index</th>
    <th>Compound Material</th>
    <th>Compound Notation</th>
	<th>Compound mol2</th>
	<th>Compound Prooperties</th>
  </tr>

</table>
</div>
	<center>
	<button className="btn btn-success" onClick={uploadCompounds}>Upload Compounds</button>
	</center>
		
				</>
		
	);
};

export default  BulkAddCompound;
