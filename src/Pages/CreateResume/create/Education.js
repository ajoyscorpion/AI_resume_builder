import React, { useEffect, useRef, useState } from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import IconButton from '@mui/material/IconButton'
import RemoveIcon from '@mui/icons-material/Remove';
import Typography from '@mui/material/Typography'
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import MicNoneIcon from '@mui/icons-material/MicNone';
import InputAdornment from '@mui/material/InputAdornment';



function Education({onChange}) {

    const [educations,setEducations] = useState([{
        college:'',
        course:'',
        from:'',
        to:'',
        selectedFrom:dayjs(),
        selectedTo:dayjs(),
        currentCollege:false
    }])

    const educationCourseRef = useRef(null)
    const educationCollegeRef = useRef(null)
    const [isCourseRecording, setIsCourseRecording] = useState(false);
    const [isCollegeRecording, setIsCollegeRecording] = useState(false);
    const recognitionRef = useRef(null);

    const handleAddEducation = () => {
        const updateEducations = [...educations]
        updateEducations.push({
            college:'',
            course:'',
            from:'',
            to:'',
            selectedFrom:dayjs(),
            selectedTo:dayjs(),
            currentCollege:false
        })
        setEducations(updateEducations)
        onChange(updateEducations)
    }

    const handleChangeEducation = (indexEducation,field,value) => {
        const updateEducation = [...educations]
        updateEducation[indexEducation][field] = value
        if ( field === 'from' || field === 'to'){
            updateEducation[indexEducation][field] = dayjs(value).format('MM/YYYY')
        }
        setEducations(updateEducation)
        onChange(updateEducation)
    }

    const handleChangeCurrentCollege = (index) => {
        const updateEducation = [...educations]
        updateEducation[index].currentCollege = !updateEducation[index].currentCollege
        setEducations(updateEducation)
        onChange(updateEducation)
    }

    const handleDeleteEducation = (indexEducation) => {
        const updateEducation = [...educations]
        updateEducation.splice(indexEducation,1)
        setEducations(updateEducation)
        onChange(updateEducation)
    }

    const handleVoiceInput = (setter , ref, isRecording,setIsRecording) => {
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

    useEffect(()=>{
        console.log(educations);
    },[educations])

  return (
    <div>
        <Grid container >
            {educations.map((items,indexEducation)=>(
                <>
                    <Grid container justifyContent="flex-end" alignItems="flex-end" key={indexEducation} sx={{mt:5}}>
                        <IconButton size="small" onClick={()=>handleDeleteEducation(indexEducation)}>
                            <RemoveIcon />
                            <Typography variant="caption" display="block" gutterBottom sx={{mt:0.5}}>
                                Remove
                            </Typography>
                        </IconButton>
                    </Grid>
                    <Grid xs={10} sm={8}>
                        <TextField inputRef={educationCourseRef} fullWidth width={8} id="course" label="Course" value={items.course} variant="standard" onChange={(e)=>handleChangeEducation(indexEducation,'course',e.target.value)} xs={8}
                            InputProps={{
                                endAdornment: <InputAdornment position="start">
                                        <IconButton aria-label="delete" onClick={()=>handleVoiceInput(value => handleChangeEducation(indexEducation,'course',value),educationCourseRef,isCourseRecording, setIsCourseRecording)}>
                                            {isCourseRecording ? <GraphicEqIcon /> : <MicNoneIcon />}
                                        </IconButton>
                                    </InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid xs={10} sm={8}>
                        <TextField inputRef={educationCollegeRef} fullWidth id="college" label="University/College Name" value={items.college} variant="standard" onChange={(e)=>handleChangeEducation(indexEducation,'college',e.target.value)} xs={8}
                            InputProps={{
                                endAdornment: <InputAdornment position="start">
                                        <IconButton aria-label="delete" onClick={()=>handleVoiceInput(value => handleChangeEducation(indexEducation,'college',value),educationCollegeRef,isCollegeRecording, setIsCollegeRecording)}>
                                            {isCollegeRecording ? <GraphicEqIcon /> : <MicNoneIcon />}
                                        </IconButton>
                                    </InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid container>
                        <FormControlLabel
                            sx={{mt:3}}
                            value="end"
                            control={<Checkbox checked={items.currentCollege} onChange={()=>handleChangeCurrentCollege(indexEducation)} />}
                            label="Pursuing ?"
                            labelPlacement="end"
                        />
                    </Grid>
                    <Grid container columnGap={3}>
                        <Grid xs={7} sm={4}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    sx={{mt:3}}
                                    size="small"
                                    //const formattedFrom = dayjs(item.from).format('DD/MM/YYYY');
                                    views={['month', 'year']}
                                    label={'From'}
                                    value={items.selectedFrom}
                                    onChange={(newValue) => handleChangeEducation(indexEducation,'from',newValue)}
                                />
                            </LocalizationProvider>
                        </Grid>
                        {!items.currentCollege && (
                            <Grid xs={7} sm={4}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        sx={{mt:3,ml:0}}
                                        size="small"
                                        //const formattedFrom = dayjs(item.from).format('DD/MM/YYYY');
                                        views={['month', 'year']}
                                        label={'To'}
                                        value={items.selectedTo}
                                        onChange={(newValue) => handleChangeEducation(indexEducation,'to',newValue)}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        )}
                        
                    </Grid>
                </>
            ))}
            

            {/* To add Additional education */}
            <IconButton size="small" sx={{mt:2}} onClick={handleAddEducation}>
                <p style={{fontSize:"13px"}}>Add Education</p>
                <AddCircleOutlineRoundedIcon sx={{ml:1}}/>
            </IconButton>    
        </Grid>
    </div>
  )
}

export default Education
