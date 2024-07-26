import React, { useEffect } from 'react'
import './Skills.css'

function TechnicalSkills({data}) {

  const datas = data

  useEffect(()=>{
    console.log(datas);
  },[datas])

  return (
    <div className='skill_content'>
      <h4 style={{textDecorationLine: 'underline'}}>Skills</h4>
      <div className='skills_item' sx={{mb:40}}>
        <p>{datas}</p>
      </div>
    </div>
  )
}

export default TechnicalSkills
