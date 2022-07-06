import React, {useState, useEffect } from 'react'
// import './ViewList.css'
//import { Link } from 'react-router-dom';
import { useDispatch, useSelector, dispatch } from 'react-redux'
import { retrieveCompounds, findCompoundByTitle, deleteAllCompounds } from '../actions/compounds';

const CompoundList = () => {
  //initial state
  const [currentCompound, setCurrentCompound] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  const compounds = useSelector(state => state.compounds);
  const dispatch = useDispatch();

  //utility function to create rows
  const CompoundListContainer = () => {
	<div className="container">
		<h1>Compounds</h1>
		<div class="input-group">
			<input
	  			type="text"
	  			class="form-control"
	  			placeholder="Search By Title"
	  			value={searchTitle}
	  			onChange={onChangeSearchTitle}
		  	/>
		  	<button
	  			type="button"
	  			class="btn btn-outline-secondary"
	  			onclick={findCompoundByTitle}
		  	>
		  		search
		  	</button>
		</div>
		<div>
			<table>
		  		<tbody>
					<tr>
		  				<th scope="col">ID</th>
		  				<th scope="col">Name</th>
		  				<th scope="col">Notation</th>
		  			</tr>
		  			{compounds &&
						compounds.map((compound, index) => (
							<CompoundList
								onClick={() => setActiveCompound(compound, index)}
								key={index}
								ID={compound.comp_index}
								Name={compound.comp_material}
	  							Notation={compound.comp_notation}
							/>
					))}
	  			</tbody>
			</table>
		</div>
	</div>
};

	//utility functions for page
	useEffect(() => {
		dispatch(retrieveCompounds());
	},[]);

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

	return CompoundListContainer();
}
export default CompoundList
