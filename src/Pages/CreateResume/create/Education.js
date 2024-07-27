import React, { useEffect, useState } from 'react'
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
                    <Grid xs={8}>
                        <TextField fullWidth width={8} id="course" label="Course" value={items.course} variant="standard" onChange={(e)=>handleChangeEducation(indexEducation,'course',e.target.value)} xs={8}/>
                    </Grid>
                    <Grid xs={7}>
                        <TextField fullWidth id="college" label="University/College Name" value={items.college} variant="standard" onChange={(e)=>handleChangeEducation(indexEducation,'college',e.target.value)} xs={8}/>
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
                    <Grid container>
                        <Grid xs={4}>
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
                            <Grid xs={4}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        sx={{mt:3,ml:3}}
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
