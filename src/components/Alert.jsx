import React from 'react';
import { CAlert } from '@coreui/react'
import { TbAlertTriangle } from "react-icons/tb";

const AlertMessage = ({ message }) => {
  return (
    <CAlert color="danger" className='error'>
      <span className='error-message'>
          <TbAlertTriangle size={18} className='error-icon'/>
         {message}
      </span>
    </CAlert>
  )
}

export default AlertMessage