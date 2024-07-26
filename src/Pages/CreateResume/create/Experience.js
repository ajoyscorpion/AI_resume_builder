import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import IconButton from '@mui/material/IconButton'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RemoveIcon from '@mui/icons-material/Remove';


function Experience({onChange}) {

    const [additionalExperience,setAdditionalExperience] = useState([{
        jobTitle:'',
        company:'',
        place:'',
        from:'',
        to:'',
        descriptions:['']
    }])

    const [isFresher,setIsFresher] = useState(false)

    const handleAddExperience = () => {
        const newExperience = [...additionalExperience]
        newExperience.push({
            jobTitle:'',
            company:'',
            from:'',
                to:'',
            descriptions:[''] 
        })
        setAdditionalExperience(newExperience)
    }

    const handleChangeExperience = (index,field,value) => {
        const updateExperience = [...additionalExperience]
        updateExperience[index][field] = value
        setAdditionalExperience(updateExperience)
    }

    const handleDeleteExperience = (index) => {
        const updateExperience = [...additionalExperience]
        updateExperience.splice(index,1)
        setAdditionalExperience(updateExperience)
    }


    const handleAddDescription = (index) => {
        const updateExperience = [...additionalExperience]
        updateExperience[index].descriptions.push('')
        setAdditionalExperience(updateExperience)
    }

    const handleDeleteDescription = (indexExperience,indexDescription) => {
        const updateExperience = [...additionalExperience]
        updateExperience[indexExperience].descriptions.splice(indexDescription,1)
        setAdditionalExperience(updateExperience)
    }

    const handleChangeDescription = (indexExperience,indexDesciption,value) => {
        const updateExperience = [...additionalExperience]
        updateExperience[indexExperience].descriptions[indexDesciption] = value
        setAdditionalExperience(updateExperience)
    }

    useEffect(()=>{
        onChange({
            additionalExperience,
            isFresher
        })
    })

    return (
        <div>
            <FormControlLabel
                value="end"
                control={<Checkbox checked={isFresher} onChange={()=>setIsFresher(!isFresher)} />}
                label="Are you a Fresher ?"
                labelPlacement="end"
            />


            {!isFresher && additionalExperience.map((item,indexExperience) => (
                <>
                    <Grid container justifyContent="flex-end" alignItems="flex-end" key={indexExperience} sx={{mt:5}}>
                        <IconButton size="small" onClick={()=>handleDeleteExperience(indexExperience)}>
                            <RemoveIcon />
                            <Typography variant="caption" display="block" gutterBottom sx={{mt:0.5}}>
                                Remove
                            </Typography>
                        </IconButton>
                    </Grid>
                    <Grid container>
                        <Grid xs={8}>
                            <TextField fullWidth id="Job Title" label="Job Title" value={item.jobTitle} onChange={(e) => handleChangeExperience(indexExperience,'jobTitle',e.target.value)} variant="standard" xs={6} />
                        </Grid>
                    </Grid>
                    <Grid container columnSpacing={0}>
                        <Grid xs={6}>
                            <TextField  id="company" label="Company" value={item.company} onChange={(e) => handleChangeExperience(indexExperience,'company',e.target.value)} variant="standard" xs={6} />
                        </Grid>
                        <Grid xs={6}>
                            <TextField  id="place" label="Place" value={item.place} onChange={(e) => handleChangeExperience(indexExperience,'place',e.target.value)} variant="standard" xs={6} />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid xs={2} >
                            <TextField id="from" label="From" value={item.from} onChange={(e) => handleChangeExperience(indexExperience,'from',e.target.value)} variant="standard" xs={2} />
                        </Grid>
                        <Grid xs={2} sx={{ ml: 3 }}>
                            <TextField id="to" label="To" value={item.to} onChange={(e) => handleChangeExperience(indexExperience,'to',e.target.value)} variant="standard" xs={2} />
                        </Grid>
                    </Grid>
                    {item.descriptions.length === 0 && (
                        <IconButton
                            size="small"
                            sx={{ mt: 0 }}
                            onClick={() => handleAddDescription(indexExperience)}
                        >   
                            <p style={{fontSize:"13px"}}>Add Description</p>
                            <AddCircleOutlineRoundedIcon sx={{ml:1}}/>
                        </IconButton>
                    )}
                    
                    {item.descriptions.map((description,indexDesciption)=>(
                        <Grid key={indexDesciption} container sx={{ mt: 1 }}>
                            <Grid xs={10}>
                                <TextField fullWidth id="description" label="Description" variant="standard" value={description} onChange={(e) => handleChangeDescription(indexExperience,indexDesciption,e.target.value)} multiline rows={2} xs={10} />
                            </Grid>
                            <Grid xs={1}>
                                {/* To add Additional description */}
                                <IconButton size="small" sx={{ mt: 4, ml: 2 }} onClick={() => handleAddDescription(indexExperience)}>
                                    <AddCircleOutlineRoundedIcon />
                                </IconButton>
                            </Grid>
                            <Grid xs={1}>
                                {/* To Delete Additional description */}
                                <IconButton size="small" sx={{ mt: 4, ml: 1 }} onClick={() => handleDeleteDescription(indexExperience,indexDesciption)}>
                                    <DeleteOutlineIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    ))}
                </>
            ))}

            {(!isFresher ) &&(
                <IconButton size="small" sx={{mt:0}} onClick={handleAddExperience}>
                    <p style={{fontSize:"13px"}}>Add Experience</p>
                    <AddCircleOutlineRoundedIcon sx={{ml:1}}/>
                </IconButton>
            )}
        </div>
  )
}

export default Experience
