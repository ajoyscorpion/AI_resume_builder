import React, { useContext, useEffect } from 'react'
import { ResumeDetailsContext } from '../../Context/ResumeDetails'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import './FormResume.css'
import PersonalDetails from './create/PersonalDetails';
import Summary from './create/Summary';
import Experience from './create/Experience';
import Education from './create/Education';
import Projects from './create/Projects';
import Skills from './create/Skills';


function FormResume({onPrint}) {

    const {resumeDetails,setResumeDetails} = useContext(ResumeDetailsContext)
    const jobDescription = resumeDetails.personalDetails?.jobDescription || ''
    const resume = resumeDetails
    //const projects = resumeDetails.projects
    //const education = resumeDetails.education
    //const skills = resumeDetails.skills

    const handlePersonalDetails = (data) => {
        setResumeDetails(items => ({
            ...items,personalDetails:data
        }))
    }

    const handleSummary = (data) => {
        setResumeDetails(items => ({
            ...items,
            summary:data
        }))
    }

    const handleExperience = (data) => {
        setResumeDetails(items => ({
            ...items,
            workExperience:data
        }))
    }

    const handleProjects = (data) => {
        const updateProject = {...resumeDetails}
        updateProject.projects=data
        setResumeDetails(updateProject)
    }

    const handleEducation = (data) => {
        const updateEducation = {...resumeDetails}
        updateEducation.education = data
        setResumeDetails(updateEducation)
    }


    const handleSkills = (data) => {
        const updateSkills = {...resumeDetails}
        updateSkills.skills = data
        setResumeDetails(updateSkills)
    }

    // const handleProjects = (data) => {
    //     setResumeDetails(items => ({
    //         ...items,
    //         projects:data
    //     }))
    // }

    useEffect(()=> {
        console.log(resume.personalDetails);
        // console.log(projects);
        // console.log(jobDescription);
        // console.log(education);
        // console.log(skills);
        // eslint-disable-next-line
    },[resume.personalDetails]);

  return (
    <div>
        {/* Personal Details */}
        <Accordion defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                //aria-controls="panel1-content"
                id="personalDetails"
            >
                <Typography variant="h6">Personal Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <PersonalDetails onChange={handlePersonalDetails}/>
            </AccordionDetails>
        </Accordion>

        {/* Summary */}
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                //aria-controls="panel2-content"
                id="summary"
            >
                <Typography variant="h6">Summary</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Summary jobDescription={jobDescription} onChange={handleSummary}/>
            </AccordionDetails>
        </Accordion>

        {/* Work Experience */}
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                //aria-controls="panel2-content"
                id="workExperience"
            >
                <Typography variant="h6">Work Experience</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Experience onChange={handleExperience}/>
            </AccordionDetails>
        </Accordion>

        {/* Projects */}
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                //aria-controls="panel2-content"
                id="projects"
            >
                <Typography variant="h6">Projects</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Projects onChange={handleProjects}/>
            </AccordionDetails>
        </Accordion>

        {/* Education */}
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                //aria-controls="panel2-content"
                id="education"
            >
                <Typography variant="h6">Education</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Education onChange={handleEducation}/>
            </AccordionDetails>
        </Accordion>

        {/* Skills */}
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                //aria-controls="panel2-content"
                id="skills"
            >
                <Typography variant="h6">Skills</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Skills onChange={handleSkills}/>
            </AccordionDetails>
        </Accordion>

        <div className='button'>
            <Button variant="outlined" startIcon={<LocalPrintshopOutlinedIcon/>} onClick={onPrint}>
                Print
            </Button>
        </div>
    
    </div>
  )
}

export default FormResume
