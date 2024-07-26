import React, { useEffect } from 'react'
import './Projects.css'

function Projects({data}) {

  const datas = data

  useEffect(()=>{
    console.log(datas);
  },[datas])

  return (
    <div className='project-content'>
      <h4 style={{ textDecorationLine: 'underline' }}>Projects</h4>
      {datas.map((items, index) => (
        <div className='projects_item' key={index}>
          <p className='title'>{items.projectName}</p>
          {items.projectLink.map((projectLink, indexLink) => (
            <p key={indexLink}>{projectLink}</p>
          ))}
          <ul>
            {items.projectDescription.map((projectDescription, indexDescription) => (
              <li className='description' key={indexDescription}>{projectDescription}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Projects
