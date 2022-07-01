import React from 'react';
import "./ViewDetail.css"

const ViewDetailList = ({type,value}) => {
  return (
        <tr>
            <th>{type}</th>
            <td className='value'>{value}</td>
        </tr>
  )
}

export default ViewDetailList
