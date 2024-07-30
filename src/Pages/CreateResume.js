import React, { useRef, useState } from 'react'
import { ResumeDetailsContext } from '../Context/ResumeDetails'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import FormResume from './CreateResume/FormResume'
import PreviewResume from './CreateResume/PreviewResume'
import Paper from '@mui/material/Paper';
import "./CreateResume.css"
import { useReactToPrint } from 'react-to-print';
import './print.css'
import { motion } from "framer-motion"



function CreateResume() {

  const [resumeDetails,setResumeDetails] = useState({
    personalDetails: {
      name: '',
      jobDescription: '',
      email: '',
      phone: '',
      country: '',
      state: '',
      city: '',
      countryCode: '',
      additionalLinks: [],
      currentCompany:false
    },
    summary:"",
    workExperience:[

    ],
    projects:[

    ],
    education:[

    ],
    skills:''
  })

  const printRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'resume',
  })


  return (
    <ResumeDetailsContext.Provider value={{resumeDetails,setResumeDetails}}>
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} height={""}>

        {/* Edit Resume */}
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" className="preview-header" sx={{mt:5}} color="initial">Edit Your Resume</Typography>
          {/* <h3 className="preview-header"></h3> */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Paper square={false} elevation={8} className="paper">
              <FormResume onPrint={handlePrint}/>
            </Paper>
          </motion.div>
        </Grid>

        {/* Preview Resume */}

        <Grid  item xs={12} sm={6} >
          <Typography variant="h5" className="preview-header" sx={{mt:5}} color="initial">Preview Your Resume</Typography>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Paper square={false} elevation={8} className="paper">
              <div ref={printRef}>
                <PreviewResume/>
              </div>
            </Paper>
          </motion.div>
        </Grid>

      </Grid>
    </ResumeDetailsContext.Provider>
  )
}

export default CreateResume
