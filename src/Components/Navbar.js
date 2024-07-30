import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { motion } from "framer-motion"

function Navbar() {

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 10 , opacity: 1 }}
      transition={{ duration: 1, ease: 'easeIn' }}
    >
      <AppBar position="static" color='transparent'>
        <Container maxWidth="l" >
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'Roboto',
                fontWeight: 900,
                //letterSpacing: '0rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Create Your Resume
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 0,
                display: { xs: 'flex', md: 'none' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                // justifyContent: "center",
                // textAlign:'center',
                // alignItems:'center'
              }}
            >
              Create Your Resume
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </motion.div>
  );
}
export default Navbar;

