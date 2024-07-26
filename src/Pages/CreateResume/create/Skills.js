import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

function Skills({onChange}) {

  const [skills,setSkills] = useState([])

  const handleSkills = (e) => {
    setSkills(e.target.value)
  }

  useEffect(()=>{
    onChange(skills)
  },[skills,onChange])

  return (
    <div>
        <Grid container>
            <TextField
                fullWidth
                id="skills"
                label="Add Your Skills"
                multiline
                rows={4}
                //defaultValue="Default Value"
                value={skills}
                onChange={handleSkills}
            />
        </Grid>    
    </div>
  )
}

export default Skills
