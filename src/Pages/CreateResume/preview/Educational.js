import React, { useEffect } from 'react'
import './Education.css'

function Educational({data}) {

  const datas = data

  useEffect(() => {
    console.log(datas);
  },[datas])

  return (
    <div className='education_content'>
      <h4 style={{textDecorationLine: 'underline'}}>Education</h4>
      {datas.map((items,index)=>(
        <div className='education_items' key={index}>
          <p className='title'>{items.course}</p>
          <p>{items.college}</p>
          <p>{items.from} - {items.currentCollege === true ? "Present" : items.to}</p>
        </div>
      ))}
    </div>
  )
}

export default Educational
