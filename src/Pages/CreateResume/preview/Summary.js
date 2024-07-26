import React from 'react'

function Summary({data}) {

    //console.log(data);

  return (
    <div className='summary-content'>
        <p variant="subtitle2" sx={{mt:1}} gutterBottom>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data}
        </p>
    </div>
  )
}

export default Summary
