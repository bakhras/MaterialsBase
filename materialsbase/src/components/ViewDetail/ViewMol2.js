import React from 'react'
import "./ViewDetail.css"

const ViewMol2 = ({type,value}) => {
  return (
    <tr>
        <th>{type}</th>
        <td className='mol2v'>{value}</td>
    </tr>
  )
}

export default ViewMol2