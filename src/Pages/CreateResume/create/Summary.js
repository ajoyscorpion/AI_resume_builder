import React, { useRef, useState } from 'react'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { GoogleGenerativeAI } from "@google/generative-ai";
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import MicNoneIcon from '@mui/icons-material/MicNone';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton'


function Summary({jobDescription, onChange}) {

    const description = jobDescription
    const [summary,setSummary] = useState([''])
    const [isRecording, setIsRecording] = useState(false);
    const recognitionRef = useRef(null);
    const summaryRef = useRef(null)

    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_KEY);

    //console.log(description);

    const handleGenerateSummary = async () => {
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

            const prompt = `Generate a professional summary for the following job description: ${description},${summary} in three lines:`

            const result = await model.generateContent(prompt);
            const response = result.response;
            const text = response.text();
            console.log(text);
            setSummary(text)
            onChange(text)
        } catch (error) {
            console.log(error);
        }
       
    }

    const handleChangeSummary = (value) => {
        setSummary(value)
        onChange(value)
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


    // useEffect( () => {
    //     onChange(summary)
    // },[summary,onChange])



  return (
    <Grid>
        <TextField
            id="outlined-multiline-static"
            label="Add Your Summary"
            multiline
            rows={4}
            fullWidth
            value={summary}
            inputRef={summaryRef}
            onChange={(e) => handleChangeSummary(e.target.value)}
            InputProps={{
                endAdornment: <InputAdornment position="start">
                        <IconButton aria-label="delete" onClick={()=>handleVoiceInput(value => handleChangeSummary(value),summaryRef)}>
                            {isRecording ? <GraphicEqIcon /> : <MicNoneIcon />}
                        </IconButton>
                    </InputAdornment>,
            }}
        />
        <Button size="small" sx={{mt:1}} variant="outlined" startIcon={<AutoAwesomeIcon/>} onClick={handleGenerateSummary}>
            Generate Summary
        </Button>
    </Grid>
  )
}

export default Summary
