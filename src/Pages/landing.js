import React from 'react'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'

function Landing() {
  return (
    <div>
        <Grid
            width={"100%"}
            height={"83vh"}
            container 
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <Button variant="contained" href='/create_resume' size="large" m={2}>
                Create Resume
            </Button>
        </Grid>
    </div>
  )
}

export default Landing
