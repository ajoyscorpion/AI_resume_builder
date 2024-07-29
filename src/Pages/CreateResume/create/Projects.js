import React, { useEffect, useRef, useState } from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import IconButton from '@mui/material/IconButton'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Divider from '@mui/material/Divider';
import RemoveIcon from '@mui/icons-material/Remove';
import Typography from '@mui/material/Typography'
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import MicNoneIcon from '@mui/icons-material/MicNone';
import InputAdornment from '@mui/material/InputAdornment';


function Projects({onChange}) {

    const [projects,setProjects] = useState([{
        projectName:'',
        projectLink:[''],
        projectDescription:['']
    }])

    const projectNameRef = useRef(null)
    const projectDescriptionRef = useRef(null)
    //const [isRecording, setIsRecording] = useState(false);
    const [isProjectNameRecording, setIsProjectNameRecording] = useState(false);
    const [isDescriptionRecording, setIsDescriptionRecording] = useState(false);

    const recognitionRef = useRef(null);


    const handleAddDescription = (indexProject) => {
        const updateProjects = [...projects]
        updateProjects[indexProject].projectDescription.push('')
        setProjects(updateProjects)
        onChange(updateProjects)
    }

    const handleChangeProjectDescription = (indexProject,indexProjectDescription,value) => {
        const updateProject = [...projects]
        updateProject[indexProject].projectDescription[indexProjectDescription] = value
        setProjects(updateProject)
        onChange(updateProject)
    }

    const handleDeleteProjectDescription = (indexProjectDescription,indexProject) => {
        const updateProjects = [...projects]
        updateProjects[indexProject].projectLink.splice(indexProjectDescription,1)
        setProjects(updateProjects)
        onChange(updateProjects)
    }

    const handleAddProjectLink = (indexProject) => {
        const updateProjects = [...projects]
        updateProjects[indexProject].projectLink.push('')
        setProjects(updateProjects)
        onChange(updateProjects)
    }

    const handleChangeProjectLink = (indexProject,indexProjectLink,value) => {
        const updateProject = [...projects]
        updateProject[indexProject].projectLink[indexProjectLink] = value
        setProjects(updateProject)
        onChange(updateProject)
    }

    const handleDeleteProjectLink = (indexProjectLink,indexProject) => {
        const updateProjects = [...projects]
        updateProjects[indexProject].projectLink.splice(indexProjectLink,1)
        setProjects(updateProjects)
        onChange(updateProjects)
    }

    const handleAddProjects = () => {
        const updateProjects = [...projects]
        updateProjects.push({
            projectName:'',
            projectLink:[''],
            projectDescription:['']
        })
        setProjects(updateProjects)
        onChange(updateProjects)
    }

    const handleChangeProject = (indexProject,field,value) => {
        const updateProject = [...projects]
        updateProject[indexProject][field]=value
        setProjects(updateProject)
        onChange(updateProject)
    }

    const handleDeleteProject = (indexProject) => {
        const updateProjects = [...projects]
        updateProjects.splice(indexProject,1)
        setProjects(updateProjects)
        onChange(updateProjects)
    }

    const handleVoiceInput = (setter , ref, isRecording, setIsRecording) => {
        if (isRecording) {
            recognitionRef.current.stop();
            //window.webkitSpeechRecognition.stop();
            setIsRecording(false);
        } else {
            const recognition = new window.webkitSpeechRecognition()
            recognition.lang = 'en-US'
            recognition.continuous = true; // Continue listening even if there is a brief pause
            recognition.interimResults = false; // Get final results only
            recognition.start();
            setIsRecording(true);
            recognitionRef.current = recognition;
            
            recognition.onresult = (event) => {
                if (event.results && event.results[0] && event.results[0][0]) {
                    const transcript = event.results[0][0].transcript;
                    console.log(transcript);
                    setter(transcript);
                    setTimeout(() => ref.current.focus(), 200);
                    //onChange={()=>{setter(transcript)}}
                }
            }

            recognition.onerror = (event) => {
                console.log(event.error);
                setIsRecording(false);
            }

            recognition.onend = () => {
                setIsRecording(false);
            };
        }
    }

    useEffect(() => {
        console.log(projects);
        // onChange({
        //     projects
        // })
    },[projects])

  return (
    <div>

        {projects.map((items,indexProject) => (
            <>
                <Grid container justifyContent="flex-end" alignItems="flex-end" key={indexProject} sx={{mt:5}}>
                    <IconButton size="small" onClick={()=>handleDeleteProject(indexProject)}>
                        <RemoveIcon />
                        <Typography variant="caption" display="block" gutterBottom sx={{mt:0.5}}>
                            Remove
                        </Typography>
                    </IconButton>
                </Grid>
                <Grid container >
                    <Grid xs={10} sm={8}>
                        <TextField inputRef={projectNameRef} fullWidth id="projectTitle" value={items.projectName} onChange={(e) => handleChangeProject(indexProject,'projectName',e.target.value)} label="Project Title" variant="standard" xs={8}
                            InputProps={{
                                endAdornment: <InputAdornment position="start">
                                        <IconButton aria-label="delete" onClick={()=>handleVoiceInput(value => handleChangeProject(indexProject,'projectName',value),projectNameRef,isProjectNameRecording, setIsProjectNameRecording)}>
                                            {isProjectNameRecording ? <GraphicEqIcon /> : <MicNoneIcon />}
                                        </IconButton>
                                    </InputAdornment>,
                            }}
                        />
                    </Grid>

                    {items.projectLink.map((projectLink,indexProjectLink) => (
                        <>
                            <Grid xs={8} key={indexProjectLink}>
                                <TextField fullWidth id="projectLink" label="Project links" variant="standard" value={projectLink} xs={8} onChange={(e) => handleChangeProjectLink(indexProject,indexProjectLink,e.target.value)}/>
                            </Grid>
                            <Grid xs={1}>
                                {/* To add Additional project link */}
                                <IconButton size="small" sx={{mt:2,ml:2}} xs={1} onClick={() => handleAddProjectLink(indexProject)}>
                                    <AddCircleOutlineRoundedIcon/>
                                </IconButton>
                            </Grid>
                            <Grid xs={1}>
                                {/* To delete Additional project link */}
                                <IconButton size="small" sx={{mt:2,ml:1}} onClick={() => handleDeleteProjectLink(indexProjectLink,indexProject)}>
                                    <DeleteOutlineIcon/>
                                </IconButton>
                            </Grid>
                        </>
                    ))}


                    {items.projectDescription.map((projectDescription,indexProjectDescription) => (
                        <>
                            <Grid xs={10} key={indexProjectDescription}>
                                <TextField inputRef={projectDescriptionRef} fullWidth id="description" label="Description" variant="standard" value={projectDescription} onChange={(e) => handleChangeProjectDescription(indexProject,indexProjectDescription,e.target.value)} multiline rows={2} xs={10}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">
                                                <IconButton aria-label="delete" onClick={()=>handleVoiceInput(value => handleChangeProjectDescription(indexProject,indexProjectDescription,value),projectDescriptionRef,isDescriptionRecording, setIsDescriptionRecording)}>
                                                    {isDescriptionRecording ? <GraphicEqIcon /> : <MicNoneIcon />}
                                                </IconButton>
                                            </InputAdornment>,
                                    }}
                                />
                            </Grid>
                            <Grid xs={1}>
                                {/* To add Additional description */}
                                <IconButton size="small" sx={{mt:4,ml:2}} onClick={() => handleAddDescription(indexProject)}>
                                    <AddCircleOutlineRoundedIcon/>
                                </IconButton>
                            </Grid>
                            <Grid xs={1}>
                                {/* To delete Additional description */}
                                <IconButton size="small" sx={{mt:4,ml:1}} onClick={() => handleDeleteProjectDescription(indexProjectDescription,indexProject)}>
                                    <DeleteOutlineIcon/>
                                </IconButton>
                            </Grid>
                        </>
                    ))}    

                </Grid>
                <Divider sx={{mt:5}}></Divider>
            </>
        ))}


        {/* To add Additional Projects */}
        <IconButton size="small" sx={{mt:2}} onClick={handleAddProjects}>
            <p style={{fontSize:"13px"}}>Add Projects</p>
            <AddCircleOutlineRoundedIcon sx={{ml:1}}/>
        </IconButton>
    </div>
  )
}

export default Projects
