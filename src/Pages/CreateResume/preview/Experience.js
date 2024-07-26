import React, { useEffect } from 'react'
import './Experience.css'

function Experience({data}) {

    const datas = data

    useEffect(()=>{
        //console.log(datas);
    },[datas])
  return (
    <div className='workExperience-content'>
        <h4 style={{textDecorationLine: 'underline'}}>Work Experience</h4>
        {datas.additionalExperience.map((items,index)=>(
            <div className='work_experience' key={index}>
                <p className='title' style={{fontWeight: 'bold'}}>{items.jobTitle}</p>
                <p>{items.company} | {items.place}</p>
                <p>{items.from}-{items.to}</p>
                <ul>
                    {items.descriptions.length > 0 && (
                        <>
                            {items.descriptions?.map((description,indexDescription)=>(
                                <li className='description' key={indexDescription}>{description}</li>
                            ))}
                        </>
                    )}
                </ul>
            </div>
        ))}
    </div>
  )
}

export default Experience
