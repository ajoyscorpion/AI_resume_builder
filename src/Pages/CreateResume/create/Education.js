import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import IconButton from '@mui/material/IconButton'
import RemoveIcon from '@mui/icons-material/Remove';
import Typography from '@mui/material/Typography'


function Education({onChange}) {

    const [educations,setEducations] = useState([{
        college:'',
        course:'',
        from:'',
        to:''
    }])

    const handleAddEducation = () => {
        const updateEducations = [...educations]
        updateEducations.push({
            college:'',
            course:'',
            from:'',
            to:''
        })
        setEducations(updateEducations)
        onChange(updateEducations)
    }

    const handleChangeEducation = (indexEducation,field,value) => {
        const updateEducation = [...educations]
        updateEducation[indexEducation][field] = value
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
                    <Grid xs={2}>
                        <TextField sx={{ml:1}} id="from" label="From" variant="standard" value={items.from} onChange={(e)=>handleChangeEducation(indexEducation,'from',e.target.value)} xs={1}/>
                    </Grid>
                    <Grid xs={2}>
                        <TextField sx={{ml:1}} id="to" label="To" variant="standard" value={items.to} onChange={(e)=>handleChangeEducation(indexEducation,'to',e.target.value)} xs={1}/>
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
