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

        <Grid item xs={6}>
          <Typography variant="h5" className="preview-header" sx={{mt:5}} color="initial">Edit Your Resume</Typography>
          {/* <h3 className="preview-header"></h3> */}
          <Paper square={false} elevation={8} className="paper">
            <FormResume onPrint={handlePrint}/>
          </Paper>
        </Grid>

        {/* Preview Resume */}

        <Grid  item xs={6} >
          <Typography variant="h5" className="preview-header" sx={{mt:5}} color="initial">Preview Your Resume</Typography>
          <Paper square={false} elevation={8} className="paper">
            <div ref={printRef}>
              <PreviewResume/>
            </div>
          </Paper>
        </Grid>

      </Grid>
    </ResumeDetailsContext.Provider>
  )
}

export default CreateResume
