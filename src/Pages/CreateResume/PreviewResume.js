import React, { useContext, useEffect } from 'react'
import { ResumeDetailsContext } from '../../Context/ResumeDetails'
import Educational from './preview/Educational'
import Experience from './preview/Experience'
import PersonalInformation from './preview/PersonalInformation'
import Projects from './preview/Projects'
import Summary from './preview/Summary'
import TechnicalSkills from './preview/TechnicalSkills'
import Divider from '@mui/material/Divider';


function PreviewResume() {

    const {resumeDetails} = useContext(ResumeDetailsContext)
    const { personalDetails, summary, workExperience, projects, education, skills } = resumeDetails;
    // const personalData = resumeDetails.personalDetails
    // const summary = resumeDetails.summary
    // const workExperience = resumeDetails.workExperience;
    // const projects = resumeDetails.projects
    // const education = resumeDetails.education
    // const skills = resumeDetails.skills

    useEffect(() => {
        //console.log(resumeDetails.personalDetails);
        //console.log(workExperience);
        //console.log(projects);
        //console.log(skills);
        //console.log(resumeDetails);
    }, [resumeDetails]);

  return (
    <div>

      {/* Personal Information */}
      {personalDetails && (personalDetails.name || personalDetails.email || personalDetails.phone) && (
        <div className='personal-info-main'>
            <PersonalInformation data={personalDetails} />
            <Divider className='divider' sx={{mt:3}}/>
        </div>
      )}

      {summary.length > 0 && (
        <div className='summary'>
          <Summary data={summary} />
          <Divider sx={{mt:3}}/>
        </div>
      )}
        
        {/* Experience */}
       
        {/* {(workExperience?.isFresher === false ) && (
            <>
            <Experience data={workExperience}/>
            <Divider></Divider>
        </>
        )} */}

        {/* Work Experience */}
        {workExperience?.isFresher === false && workExperience && workExperience.additionalExperience && workExperience.additionalExperience.length > 0 && (
          <div className='workExperience'>
              <Experience data={workExperience} />
              <Divider />
          </div>
        )}
      

        {projects && projects.length > 0 && (
          <div className='projects'>
              <Projects data={projects} />
              <Divider />
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div className='education'>
              <Educational data={education} />
              <Divider />
          </div>
        )}
        
        {/* Technical Skills */}
        {skills && skills.length > 0 && (
          <div className='skills'>
              <TechnicalSkills data={skills} />
              <hr/>
          </div>
        )}
        
    </div>
  )
}

export default PreviewResume
