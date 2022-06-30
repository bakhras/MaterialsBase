import React from 'react'
import "./ViewDetail.css"
import { compounds } from "../../data.js";
import { mol_detail } from "../../data2.js";
import {useParams} from 'react-router';
import ViewDetailList from './ViewDetailList';
import ViewMol2 from './ViewMol2';

// let {comp_id} = useParams();

const ViewDetail = (props) => {
  const {index} = useParams();
	const mol2 = compounds[index-1].comp_mol2;
  const [value,setValue] = React.useState('atom')
  const handleChange = (event) =>
  {
    setValue(event.target.value);
  };

  return (
    <div>
      <div className='top'>
        <div className='header'>
          <h5>Compounds Summary</h5>
        </div>
        <div className='notation'>
          <h1> {mol2.name} </h1>
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
                  <ViewDetailList 
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
              {
                value === "molecular" ? 
                Object.keys(mol_detail[0]).map((item)=>(
                  // console.log(item)
                  <ViewMol2 
                  type = {item}
                  value = {mol_detail[0][item]} />
                ))
                : value === "atom" ?
                Object.keys(mol_detail[1]).map((item)=>(
                  // console.log(item)
                  <ViewMol2 
                  type = {item}
                  value = {mol_detail[1][item]} />
                ))
                :
                Object.keys(mol_detail[2]).map((item)=>(
                  // console.log(item)
                  <ViewMol2 
                  type = {item}
                  value = {mol_detail[2][item]} />
                ))
              }
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

export default ViewDetail