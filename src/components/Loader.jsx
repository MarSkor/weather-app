import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className='loader'>
        <ThreeDots 
        height="80" 
        width="80" 
        radius="9"
        color="#ffd919" 
        ariaLabel="three-dots-loading"
        className="loader"
        />
    </div>
  )
}

export default Loader