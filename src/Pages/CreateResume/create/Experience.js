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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


function Experience({onChange}) {

    //const [selectedDate,setSelectedDate] = useState(dayjs)
    const [additionalExperience,setAdditionalExperience] = useState([{
        jobTitle:'',
        company:'',
        place:'',
        selectedFrom:dayjs(),
        selectedTo:dayjs(),
        from:'',
        to:'',
        descriptions:[''],
        currentCompany:false
    }])

    const [isFresher,setIsFresher] = useState(false)

    const handleAddExperience = () => {
        const newExperience = [...additionalExperience]
        newExperience.push({
            jobTitle:'',
            company:'',
            selectedFrom:dayjs(),
            selectedTo:dayjs(),
            from:'',
            to:'',
            descriptions:[''],
            currentCompany:false
        })
        setAdditionalExperience(newExperience)
    }

    const handleChangeExperience = (index,field,value) => {
        console.log(value);
        console.log(field);
        //const formattedDate = dayjs(value).format('MM/YYYY');
        //console.log(formattedDate);
        console.log("Inside");
        const updateExperience = [...additionalExperience]
        console.log(updateExperience);
        updateExperience[index][field] = value
        console.log(updateExperience);
        if ( field === 'from' || field === 'to'){
            updateExperience[index][field] = dayjs(value).format('MM/YYYY')
        }
        setAdditionalExperience(updateExperience)
    }

    const handleChangeCurrentCompany = (index) => {
        const updateExperience = [...additionalExperience]
        updateExperience[index].currentCompany = !updateExperience[index].currentCompany
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
                        <FormControlLabel
                            sx={{mt:3}}
                            value="end"
                            control={<Checkbox checked={item.currentCompany} onChange={()=>handleChangeCurrentCompany(indexExperience)} />}
                            label="Current Company ?"
                            labelPlacement="end"
                        />
                    </Grid>
                    <Grid container>
                        <Grid xs={4} >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    sx={{mt:3}}
                                    size="small"
                                    //const formattedFrom = dayjs(item.from).format('DD/MM/YYYY');
                                    views={['month', 'year']}
                                    label={'From'}
                                    value={item.selectedFrom}
                                    onChange={(newValue) => handleChangeExperience(indexExperience,'from',newValue)}
                                />
                            </LocalizationProvider>
                            {/* <TextField id="from" label="From" value={item.from} onChange={(e) => handleChangeExperience(indexExperience,'from',e.target.value)} variant="standard" xs={2} /> */}
                        </Grid>
                        {!item.currentCompany && (
                            <Grid xs={4} sx={{ ml: 3 }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        sx={{mt:3}}
                                        size="small"
                                        //const formattedFrom = dayjs(item.from).format('DD/MM/YYYY');
                                        views={['month', 'year']}
                                        label={'To'}
                                        value={item.selectedTo}
                                        onChange={(newValue) => handleChangeExperience(indexExperience,'to',newValue)}
                                    />
                                </LocalizationProvider>
                             
                                {/* <TextField id="to" label="To" value={item.to} onChange={(e) => handleChangeExperience(indexExperience,'to',e.target.value)} variant="standard" xs={2} /> */}
                            </Grid>
                        )}
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
