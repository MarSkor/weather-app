import React, { useState, useEffect} from 'react';

const DateToday = () => {
  const [dateState, setDateState] = useState(new Date());

  useEffect(() => {
    setInterval(() => setDateState(new Date()), 60 * 1000);
    }, []);

  return (
    <div className='date'>
        <span className='date__day'>
        <p>
        {' '}
        {dateState.toLocaleDateString('en-GB', {
          weekday: 'long',
          day: 'numeric',
          month: 'short',
        })}
        </p>
        </span>
        <span className='date__time'>
        <p>
        {' '}
        {dateState.toLocaleString('en-GB', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: false,
        })}
        </p>
        </span>
    </div>
  )
}

export default DateToday