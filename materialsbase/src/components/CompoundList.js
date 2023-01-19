import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	retrieveCompounds,
	//findCompoundById,
	//findCompoundByIndex,
	deleteAllCompounds,
} from "../actions/compounds";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';
import Papa from "papaparse"; /* csv extraction */

const CompoundsList = () => {
	const [currentCompound, setCurrentCompound] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(-1);
	const [searchTitle, setSearchTitle] = useState("");
	const compounds = useSelector(state => state.compounds);
	const dispatch = useDispatch();
	const [viewMode, setViewMode] = useState(false);

	useEffect(() => {
		dispatch(retrieveCompounds());
	}, [dispatch]);

	const onChangeSearchTitle = e => {
		const searchTitle = e.target.value;
		setSearchTitle(searchTitle);
	};

	const refreshData = () => {
		setCurrentCompound(null);
		setCurrentIndex(-1);
	};

	const setActiveCompound = (compound, index) => {
		setCurrentCompound(compound);
		setCurrentIndex(index);
	};

	const removeAllCompounds = () => {
		dispatch(deleteAllCompounds())
		.then(response => {
			console.log(response);
			refreshData();
		})
		.catch(err => {
			console.log(err);
		});
	};

	//const findByTitle = () => {
	//	refreshData();
	//	dispatch(findCompoundByIndex(searchTitle));
	//};

	const downloadMol2 = () => {
		const element = JSONtoMOL2();
		const url = window.URL.createObjectURL(new Blob([element]));
		const link = document.createElement('a');
		const filename = currentCompound.comp_material + ".mol2";

		link.href = url;
		link.setAttribute(
			'download',
			filename
		);

		document.body.appendChild(link);
		link.click();
		link.parentNode.removeChild(link);
	};

	//Method to change the JSONB to a MOL2 FIle
	const JSONtoMOL2 = () => {
		const obj = JSON.parse(currentCompound.comp_mol2);

		console.log(obj.mol2.atom);

		//Mapping object values to key value pairs
		const moleculeMap= new Map(Object.entries(obj.mol2.molecule));
		const atomMap=new Map(Object.entries(obj.mol2.atom));
		const bondMap= new Map(Object.entries(obj.mol2.bond));

		//Concatenating molecule information into string
		var mol2FileString= "@<TRIPOS>MOLECULE\n";
		mol2FileString+= moleculeMap.get("mol_name")+"\n ";
		mol2FileString+= moleculeMap.get("num_atoms")+" "+
			moleculeMap.get("num_bonds")+" "+
			moleculeMap.get("num_subst")+" "+
			moleculeMap.get("num_feat")+" "+
			moleculeMap.get("num_sets")+"\n";

		mol2FileString+=moleculeMap.get("mol_type")+"\n";

		mol2FileString+=moleculeMap.get("charge_type")+"\n";

		if(moleculeMap.get("status_bits")!==""){
			mol2FileString+=moleculeMap.get("status_bits")+"\n";
		}

		mol2FileString+=moleculeMap.get("mol_comment")+"\n";

		//Concatenating atom information into string
		mol2FileString+= "@<TRIPOS>ATOM\n";
		const numPaddingATOM= formatSpacing(atomMap);

		atomMap.forEach((value,key)=>{
			const atomEntryMap=new Map(Object.entries(value));

			mol2FileString+=atomEntryMap.get("atom_id").padStart(numPaddingATOM," ")+
				atomEntryMap.get("atom_name").padStart(numPaddingATOM," ")+
				atomEntryMap.get("x").padStart(numPaddingATOM," ")+
				atomEntryMap.get("y").padStart(numPaddingATOM," ")+
				atomEntryMap.get("z").padStart(numPaddingATOM," ")+
				atomEntryMap.get("atom_type").padStart(numPaddingATOM," ")+
				atomEntryMap.get("subst_id").padStart(numPaddingATOM," ")+
				atomEntryMap.get("subst_id").padStart(numPaddingATOM," ")+"\n";

			});


		//Concatenating bond information into string
		mol2FileString+= "@<TRIPOS>BOND\n";
		const numPaddingBOND= formatSpacing(bondMap);
		bondMap.forEach((value,key)=>{
			const bondEntryMap=new Map(Object.entries(value));
			mol2FileString+=bondEntryMap.get("bond_id").padStart(numPaddingBOND," ")+
				bondEntryMap.get("bond_id").padStart(numPaddingBOND," ")+
				bondEntryMap.get("origin_atom_id").padStart(numPaddingBOND," ")+
				bondEntryMap.get("target_atom_id").padStart(numPaddingBOND," ")+
				bondEntryMap.get("bond_type").padStart(numPaddingBOND," ")+"\n";
		});
		console.log(mol2FileString);
		return mol2FileString;
	};

	const formatSpacing = (spacingMap) =>
	{
		var largestStringLength=0;
		spacingMap.forEach((value,key)=>{
			const JSONEntryMap=new Map(Object.entries(value));
			JSONEntryMap.forEach((value,key)=>{
				largestStringLength=Math.max(largestStringLength,value.length)
			})
		
		})
		return largestStringLength+1;
	}


	const downloadCSV = () => {
		const result = Papa.unparse([currentCompound.comp_properties])
		console.log(result)
		const url = window.URL.createObjectURL(
			new Blob([result],{type: 'text/csv;charset=utf-8;'})
		);
		const link = document.createElement('a');
		const filename = currentCompound.comp_material + ".csv";
		link.href = url;
		link.setAttribute(
			'download',
			filename
		);
		document.body.appendChild(link);
		link.click();
		link.parentNode.removeChild(link);
	};

	const filteredCompound = compounds.filter(compounds=>{
		return compounds.comp_material.toLowerCase().includes(searchTitle.toLowerCase())
	});

	const handleView = () => {
		setViewMode(true);
	}

	return (
		<div className="container">
		<div className="row" >
			<div className="col-md-8" style={{margin:"auto"}}>
				<div className="input-group mb-3"  style={{textAlign:"center"}}  >
					<input
						type="search"
						className="form-control"
						placeholder="Search by name"
						value={searchTitle}
						onChange={onChangeSearchTitle}
					/>
					
				</div>
			</div>
		</div>
		<div className="row" style={{margin:"auto"}}>

		<div className="col">
			<h4>Compounds List</h4>
			<ul className="list-group" style={{display:"block", height:"500px", overflow:"auto"}}>
				{filteredCompound &&
				filteredCompound.map((compound, index) => (
					<strong><li
						className={
							"list-group-item " + (index === currentIndex ? "active" : "")
						}
						onClick={() => setActiveCompound(compound, index)}
						key={compound.comp_id}
					>
						{compound.comp_material}
					</li></strong>
				))}
				
			</ul>
			<div style={{margin:"auto",textAlign:"center"}}>
			<button
			
				className="m-3 btn btn-sm btn-danger"
				onClick={removeAllCompounds}
			>Remove All</button>
			</div>
		</div>
		
		<div className="col">
			{currentCompound ? (
				<div>
					<h4>Compound</h4>

					<div>
					<label>
						<strong>PubChemID:</strong>
					</label>
					<strong>{ " " + currentCompound.comp_index}</strong>
				</div>
				<div>
					<label>
						<strong>Materials:</strong>
					</label>
					{ " " + currentCompound.comp_material}
				</div>
				<div>
					<label>
						<strong>Notation:</strong>
					</label>
					{ " " + currentCompound.comp_notation}
				</div>
				<div >
				<div className="input-group-append" style={{display:"grid"}}>
				 
					<button
						type="button"
						className="btn btn-primary mb-2 compBtn"
						onClick={()=>handleView()}
					>View Properties...
					</button>
				</div>
				<div className="input-group-append" style={{display:"grid"}}>
					<button
						type="button"
						className="btn btn-outline-dark mb-2 compBtn"

						onClick={ ()=> downloadMol2() }
					>Download mol2 (.mol2)</button>
				</div>
				<div className="input-group-append" style={{display:"grid"}}>
					<button
						type="button"
						className="btn btn-outline-dark mb-2 compBtn"
						onClick={()=> downloadCSV() }
					>Download Properties (.csv)</button>
				</div>
				</div>
				<div style={{textAlign:"center"}}>
				<Link 
					to={"/" + currentCompound.comp_id}
					
				>
				<button 
						type="button"
						className="btn btn-outline-dark mb-2 compBtn"
						
					>Edit</button>
					</Link>
				</div>
				</div>

			) : (
				<div >
					<br />
					<MDBCard style={{ maxWidth: '22rem',backgroundColor:"#488aab57",margin:"auto", boxShadow: "2px 2px 5px"}}>
						<MDBCardBody>
							<MDBCardTitle className="fw-bold">Quick Manual</MDBCardTitle>
							<MDBCardText>
								The left side is a list of compounds that are available on <strong>MaterialsBase</strong> database. Please click on a compound to see more detail or edit it. Please click on the Add button to add more compounds to the database.<br/><br/> Thank you !
							</MDBCardText>
						</MDBCardBody>
					</MDBCard>
				</div>
			)}
		</div>
		
		{viewMode === true ? (
				<div className="col">
				<h4> Properties Table </h4>
				<table className="table table-striped table-bordered table-sm mt-2" style={{display:"block",height:"400px",width:"230px", overflow:"auto"}}>
					<thead>
						<tr>
						<th className="th-sm fw-bold">Properties</th>
						<th className="th-sm fw-bold">Values</th>
						</tr>
					</thead>
					<tbody>
						{Object.keys( JSON.parse(JSON.stringify(currentCompound.comp_properties))).sort().map((key, i)=>
							(
							<tr key={i}>
								<td className="fw-bold">{key}</td>
								<td>{ JSON.parse(JSON.stringify(currentCompound.comp_properties))[key] }</td>
							</tr>
						))}
					</tbody>
				</table>
				</div>
		) : (
			<div>
			
			</div>
		)}
		
		</div>
		</div>
	);
};

export default CompoundsList;
