import React, { useEffect, useRef, useState } from 'react'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import IconButton from '@mui/material/IconButton'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Country, State, City }  from 'country-state-city';
import MicNoneIcon from '@mui/icons-material/MicNone';
import InputAdornment from '@mui/material/InputAdornment';
import MicIcon from '@mui/icons-material/Mic';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
 

function PersonalDetails({onChange}) {

    const [additionalLinks,setAdditionalLinks] = useState([{type:'',url:''}])
    const [name,setName] = useState()
    const [jobDescription,setJobDescription] = useState()
    const [email,setEmail] = useState()
    const [phone,setPhone] = useState()
    const [country,setCountry] = useState()
    const [state,setState] = useState()
    const [city,setCity] = useState()
    const [countryCode,setCountryCode] = useState('')
    const [states,setStates] = useState([])
    const [cities,setCities] = useState([])
    const [isRecording, setIsRecording] = useState(false);
    const recognitionRef = useRef(null);

    //const [activeField, setActiveField] = useState('');

    const nameRef = useRef(null);
    const jobDescriptionRef = useRef(null);
    //const emailRef = useRef(null);
    const phoneRef = useRef(null);

    const countries = Country.getAllCountries()

    useEffect(() => {
        onChange({
            name,
            jobDescription,
            email,
            phone,
            country,
            state,
            city,
            countryCode,
            additionalLinks,
        });
        //console.log('Name:', name);
    } ,[name, jobDescription, email, phone, country, state, city, countryCode, additionalLinks,onChange])

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleJobDescription = (e) => {
        setJobDescription(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePhone = (e) => {
        setPhone(e.target.value)
    }

    const handleCountry = (e) => {
        setCountry(e.target.value)
        const getCountryCode = countries.find(item => item.name === e.target.value)
        setStates(State.getStatesOfCountry(getCountryCode.isoCode))
        setCountryCode(getCountryCode.phonecode)
        console.log(getCountryCode.isoCode);
    }

    const handleState = (e) =>{
        setState(e.target.value)
        const getStateCode = states.find(item => item.name === e.target.value)
        setCities(City.getCitiesOfState(getStateCode.countryCode,getStateCode.isoCode))
    }

    const handleCity = (e) => {
        setCity(e.target.value)
    }

    const handleCountryCode = (e) => {
        setCountryCode(e.target.value)
    }


    // Add link Button
    const handleAddLink = () => {
        setAdditionalLinks(
            [
                ...additionalLinks,
                {
                    type : '',
                    url : ''
                }
            ]
        )
    }

    // Delete Link Button
    const handleDeleteLink = (index) => {
        const updatedAdditionalLink = [...additionalLinks]
        updatedAdditionalLink.splice(index,1)
        setAdditionalLinks(updatedAdditionalLink)
    }

    // onchange on links
    const handleChangeLink = (index,field,value) => {
        const updatedLinks = additionalLinks.map((item,i) => i === index ? {...item,[field]:value} : item)
        setAdditionalLinks(updatedLinks)
        console.log(additionalLinks)
    } 

    const handleVoiceInput = (setter , ref) => {
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

  return (
    <div>
        <form action="">
            <Grid container>
                <Grid xs={6}>
                    <TextField inputRef={nameRef} id="name" label="Name" variant="standard" value={name || ''} onChange={handleName} xs={6} 
                        InputProps={{
                            endAdornment: <InputAdornment position="start">
                                    <IconButton aria-label="delete" onClick={()=>handleVoiceInput(setName,nameRef)}>
                                        {isRecording ? <GraphicEqIcon /> : <MicNoneIcon />}
                                    </IconButton>
                                </InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid xs={6}>
                    <TextField inputRef={jobDescriptionRef} id="jobDescription" label="Job Description" value={jobDescription} onChange={handleJobDescription} variant="standard" xs={6}
                        InputProps={{
                            endAdornment: <InputAdornment position="start">
                                    <IconButton aria-label="delete" onClick={()=>handleVoiceInput(setName,nameRef)}>
                                        {isRecording ? <GraphicEqIcon /> : <MicNoneIcon />}
                                    </IconButton>
                                </InputAdornment>,
                        }}
                    />
                </Grid>  
            </Grid> 

            <Grid container columnSpacing={2} sx={{mt:1}}>
                <Grid item xs={4}>
                    {/* <TextField id="country" label="Country" variant="standard" xs={4}/> */}
                    <FormControl variant="standard" sx={{ mt:0.3, minWidth: 90 }} size="small">
                        <InputLabel id="country">Country</InputLabel>
                        <Select
                            labelId="country"
                            id="country"
                            value={country}
                            onChange={handleCountry}
                            label="Country"
                        >
                            <MenuItem value="">
                                <em>Select</em>
                            </MenuItem>
                            {countries.map((item) => (
                                <MenuItem value={item.name}>{item.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid> 
                <Grid item xs={4}>
                    {/* <TextField id="state" label="State" variant="standard" xs={4}/> */}
                    <FormControl variant="standard" sx={{ mt:0.3, minWidth: 90 }} size="small">
                        <InputLabel id="states">States</InputLabel>
                        <Select
                            labelId="states"
                            id="states"
                            value={state}
                            onChange={handleState}
                            label="States"
                        >
                            <MenuItem value="">
                                <em>Select</em>
                            </MenuItem>
                            {states.map((item) => (
                                <MenuItem value={item.name}>{item.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    {/* <TextField id="city" label="City" variant="standard" xs={4}/> */}
                    <FormControl variant="standard" sx={{ mt:0.3, minWidth: 90 }} size="small">
                        <InputLabel id="City">City</InputLabel>
                        <Select
                            labelId="cities"
                            id="cities"
                            value={city}
                            onChange={handleCity}
                            label="City"
                        >
                            <MenuItem value="">
                                <em>Select</em>
                            </MenuItem>
                            {cities.map((item) => (
                                <MenuItem value={item.name}>{item.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid> 
            </Grid>


            <Grid container sx={{mt:1}}>
                <Grid item xs={6}>
                    <TextField fullWidth id="email" label="Email" variant="standard" value={email} onChange={handleEmail} xs={6}/>
                </Grid> 
            </Grid>

            <Grid container sx={{mt:1}}>
                <Grid item xs={12}>
                    <FormControl variant="standard" sx={{ mt:0.3, minWidth: 90 }} size="small">
                        <InputLabel id="countryCode">Country Code</InputLabel>
                        <Select
                            labelId="countryCode-label"
                            id="countryCode"
                            value={countryCode}
                            onChange={handleCountryCode}
                            label="Country Code"
                        >
                            <MenuItem value="">
                                <em>Select</em>
                            </MenuItem>
                            {countries.map((item) => (
                                <MenuItem value={item.phonecode}>{item.phonecode}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField inputRef={phoneRef} sx={{width:200, ml:3}} id="phone" label="Phone No" variant="standard" value={phone} onChange={handlePhone} xs={12}
                        InputProps={{
                            endAdornment: <InputAdornment position="start">
                                    <IconButton aria-label="delete" onClick={()=>handleVoiceInput(setName,nameRef)}>
                                        {isRecording ? <GraphicEqIcon /> : <MicNoneIcon />}
                                    </IconButton>
                                </InputAdornment>,
                        }}
                    />
                </Grid> 
            </Grid>



            {/* This should display when additional links is displayed */}

            {additionalLinks.map((item,index) => (
                <Grid container key={index}>
                    <Grid xs={3}>
                        <FormControl variant="standard" sx={{ mt:0.3,minWidth: 90 }} size="small">
                            <InputLabel id={`additionalLinks-${index}`}>Additional Links</InputLabel>
                            <Select
                                labelId={`additionalLinks-label-${index}`}
                                id={`additionalLinks-${index}`}
                                value={item.type}
                                onChange={(e) => handleChangeLink(index,"type",e.target.value)}
                                label="Additional Links"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"LinkedIn"}>LinkedIn</MenuItem>
                                <MenuItem value={"Personal"}>Personal</MenuItem>
                                <MenuItem value={"Github"}>Github</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={6}>
                        <TextField
                            fullWidth
                            id={`Links-${index}`}
                            label="Links"
                            value={item.url}
                            onChange={(e) => handleChangeLink(index,"url",e.target.value)}
                            variant='standard'
                            sx={{
                                ml:1
                            }}  
                        />
                    </Grid>
                    <Grid xs={2}>
                        <IconButton size="small" sx={{mt:2,ml:1}} onClick = {() => handleDeleteLink(index)}>
                            <DeleteOutlineIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            ))}

            
            {/* To add Additional links */}
            <IconButton size="small" sx={{mt:1}} onClick={handleAddLink}>
                <p style={{fontSize:"13px"}}>Additionl links</p>
                <AddCircleOutlineRoundedIcon sx={{ml:1}}/>
            </IconButton>

                
        </form>
    </div>
  )
}

export default PersonalDetails
