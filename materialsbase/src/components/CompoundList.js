import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	retrieveCompounds,
	findCompoundByTitle,
	deleteAllCompounds,
} from "../actions/compounds";

const CompoundsList = () => {
	const [currentCompound, setCurrentCompound] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(-1);
	const [searchTitle, setSearchTitle] = useState("");
	const compounds = useSelector(state => state.compounds);
	const dispatch = useDispatch();

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
		dispatch(findCompoundByTitle(searchTitle));
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


	return (
		<div className="list row">
			<div className="col-md-8">
				<div className="input-group mb-3">
					<input
						type="text"
						className="form-control"
						placeholder="Search by title"
						value={searchTitle}
						onChange={onChangeSearchTitle}
					/>
					<div className="input-group-append">
						<button
							className="btn btn-outline-secondary"
							type="button"
							onClick={findByTitle}
						>Search</button>
					</div>
				</div>
			</div>

		<div className="col-md-6">
			<h4>Compounds List</h4>
			<ul className="list-group">
				{compounds &&
				compounds.map((compound, index) => (
					<li
						className={
							"list-group-item " + (index === currentIndex ? "active" : "")
						}
						onClick={() => setActiveCompound(compound, index)}
						key={index}
					>
						{compound.comp_material}
					</li>
				))}
			</ul>
			<button
				className="m-3 btn btn-sm btn-danger"
				onClick={removeAllCompounds}
			>Remove All</button>
		</div>
		<div className="col-md-6">
			{currentCompound ? (
				<div>
					<h4>Compund</h4>
					<div>
					<label>
						<strong>Material:</strong>
					</label>{" "}
					{currentCompound.comp_material}
				</div>
				<div>
					<label>
						<strong>Notation:</strong>
					</label>{" "}
					{currentCompound.comp_notation}
				</div>
				<div classname="input-group-append">
					<button
						classname="btn btn-outline-secondary"
						type="button"
						onclick={downloadMol2}
					>download mol2</button>
				</div>
				<div classname="input-group-append">
					<button
						classname="btn btn-outline-secondary"
						type="button"
						onclick={downloadCSV}
					>download properties csv</button>
				</div>
				<Link
					to={"/compounds/" + currentCompound.comp_index}
					className="badge badge-warning"
				>
				Edit
				</Link>
				</div>
			) : (
				<div>
					<br />
					<p>Please click on a Compound...</p>
				</div>
			)}
			</div>
		</div>
	);
};

export default CompoundsList;
