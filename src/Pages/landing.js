import React from 'react'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { motion } from "framer-motion";


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
          <Grid sm={3} sx={{
              display: { xs: 'none', sm: 'flex' },
              marginLeft:'250px'
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h6" color="initial" sx={{fontSize:"40px"}}>
                Craft an ATS Friendly Resume
              </Typography>
            </motion.div>
          </Grid>
          <Grid xs={8}
            container 
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
              display: { xs: 'display', sm: 'none' },
              //marginLeft:'250px'
              //marginTop:'100px'
              // height:'50px'
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h6" color="initial" sx={{fontSize:"40px"}}>
                Craft an ATS Friendly Resume
              </Typography>
            </motion.div>
          </Grid>
          <Grid container columnGap={5}
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Grid item sm={3}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Typography variant="h3" color="initial" sx={{fontSize:"35px"}}>
                  "Effortlessly pass ATS and catch the eye of employers."
                </Typography>
              </motion.div>
            </Grid>
            <Grid sm={4}>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Button variant="contained" href='/create_resume' size="large" sx={{
                  borderRadius:'30px',
                  color:"black", 
                  backgroundColor:"#FFAF34",
                  marginTop:'30px'
                  }}
                >
                    Create Resume
                </Button>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>
    </div>
  )
}

export default Landing
