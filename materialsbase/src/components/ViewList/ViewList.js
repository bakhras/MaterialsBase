import React from 'react'
import './ViewList.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector, dispatch } from 'react-redux';
import { retrieveCompounds, findCompoundByTitle, deleteAllCompounds } from '../../actions/compounds';

const ViewList = () => {
  //initial state
  const [currentCompound, setCurrentCompound] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  const compounds = useSelector(state => state.compounds);
  const dispatch = useDispatch();

  //utility function to create rows
  const ViewListContainer = () => {
    <div className="container">
        <h1>Compounds</h1>
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Search By Title"/>
          <button type="button" class="btn btn-outline-secondary">search</button>
        </div>
        <table>
          <tbody>
            <tr>
              <th scope="col">PubChemID</th>
              <th scope="col">Compounds Materials</th>
              <th scope="col">Compounds Notation</th>
              <th scope="col">Compounds Component</th>
              <th scope="col">Compounds Properties  </th>
              <th scope="col">Mol2</th>
            </tr>
            {compounds.map((item) => (
                  <ViewList
                  key={item.comp_id}
                  idx={item.comp_index}
                  materials={item.comp_material}
                  notations={item.comp_notation}
                  component="detail.."/>
              ))}
            </tbody>
        </table>
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

	return ViewListContainer();
}
export default ViewList
