import React, { useState, useEffect, dispatch } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	retrieveCompounds,
	findCompoundById,
	findCompoundByIndex,
	deleteAllCompounds,
} from "../actions/compounds";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';

const CompoundsList = () => {
	const [currentCompound, setCurrentCompound] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(-1);
	const [searchTitle, setSearchTitle] = useState("");
	const compounds = useSelector(state => state.compounds);
	const dispatch = useDispatch();
	const [viewMode, setViewMode] = useState(false);

	useEffect(() => {
		dispatch(retrieveCompounds());
	}, []);

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

	const findByTitle = () => {
		refreshData();
		dispatch(findCompoundByIndex(searchTitle));
	};

	const downloadMol2 = () => {
		const element = currentCompound.comp_mol2;
		const url = window.URL.createObjectURL(
			new Blob([element])
		);
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute(
			'download',
			'file.mol2'
		);

		document.body.appendChild(link);
		link.click();
		link.parentNode.removeChild(link);
	};

	const downloadCSV = () => {
		const element = currentCompound.comp_properties;
		const url = window.URL.createObjectURL(
			new Blob([element])
		);
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute(
			'download',
			'file.csv'
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
		<div className="row">
			<div className="col-md-8">
				<div className="input-group mb-3">
					<input
						type="text"
						className="form-control"
						placeholder="Search by name"
						value={searchTitle}
						onChange={onChangeSearchTitle}
					/>
				</div>
			</div>
		</div>
		<div className="row">

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
			<button
				className="m-3 btn btn-sm btn-danger"
				onClick={removeAllCompounds}
			>Remove All</button>
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
				<div className="imput-group-append">
					<button
						type="button"
						className="btn btn-primary mb-2"
						onClick={()=>handleView()}
					>View Properties...
					</button>
				</div>
				<div className="input-group-append">
					<button
						type="button"
						className="btn btn-outline-dark mb-2"
						onClick={downloadMol2}
					>Download mol2 (.mol2)</button>
				</div>
				<div className="input-group-append">
					<button
						type="button"
						className="btn btn-outline-dark mb-2"
						onClick={downloadCSV}
					>Download Properties (.csv)</button>
				</div>
				<Link
					to={"/" + currentCompound.comp_id}
					className="badge badge-primary mt-2 w-25 p-3"
				>
				Edit
				</Link>
				</div>

			) : (
				<div>
					<br />
					<MDBCard style={{ maxWidth: '22rem' }}>
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
		<div className="col">
		{viewMode === true ? (
				<div>
				<h4> Properties Table </h4>
				<table className="table table-striped table-bordered table-sm mt-2" style={{display:"block",height:"400px",width:"230px", overflow:"auto"}}>
					<thead>
						<tr>
						<th className="th-sm fw-bold">Properties</th>
						<th className="th-sm fw-bold">Values</th>
						</tr>
					</thead>
					<tbody>
						{Object.keys(currentCompound.comp_properties).map((key,i)=> (
						<tr>
						<td className="fw-bold">{key}</td>
						<td>{currentCompound.comp_properties[key]}</td>
						</tr>
						))
						}
					</tbody>
				</table>
				</div>
		) : (
			<div>

			</div>
		)}
		</div>
		</div>
		</div>
	);
};

export default CompoundsList;
