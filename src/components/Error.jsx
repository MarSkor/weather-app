import React from 'react';
import { CAlert } from '@coreui/react'
import { TbAlertTriangle } from "react-icons/tb";

const ErrorMessage = ({ message }) => {
  return (
    <CAlert color="primary" className='error'>
      <span className='error-message'>
          <TbAlertTriangle size={18} className='error-icon'/>
         {message}
      </span>
    </CAlert>
  )
}

export default ErrorMessage