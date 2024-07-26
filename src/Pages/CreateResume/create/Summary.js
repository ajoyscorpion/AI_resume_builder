import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { GoogleGenerativeAI } from "@google/generative-ai";

function Summary({jobDescription, onChange}) {

    const description = jobDescription
    const [summary,setSummary] = useState([''])

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

    const handleChangeSummary = (event) => {
        setSummary(event.target.value)
        onChange(event.target.value)
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
            onChange={handleChangeSummary}
        />
        <Button size="small" sx={{mt:1}} variant="outlined" startIcon={<AutoAwesomeIcon/>} onClick={handleGenerateSummary}>
            Generate Summary
        </Button>
    </Grid>
  )
}

export default Summary
