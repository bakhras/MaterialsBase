import ViewList from "./ViewList";
import React from 'react'
import { compounds } from "../../data.js";
import "./ViewList.css"

const ViewListContainer = () => {
  return (
    <div className="container">
        <h1>Properties Table</h1>
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
                  key={item.comp_index}
                  idx={item.comp_index}
                  materials={item.comp_materials}
                  notations={item.comp_notation}
                  component="detail.."/>
              ))}
            </tbody>
        </table>
    </div>
  )
}

export default ViewListContainer