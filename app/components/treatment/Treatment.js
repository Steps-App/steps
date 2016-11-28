import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Helmet from 'react-helmet';

// material ui
import { CircularProgress, Paper } from 'material-ui'

// sub-components
import PlanPanel from './PlanPanel.js'

// Treatment is a stateful component that displays information to a patient
// and possibly a therapist (with minor mods) about a single treatment

// -=-=-=-=-=-= COMPONENT =-=-=-=-=-=-

const Treatment = ({ plan, treatment }) => {

  // stylings
  const padded = { padding: '15px' }
  const emphasis = { fontWeight: 'bold' }
  // handle video
  let media = ''
  if (treatment.exercise.vid_url) {  // if a video exists...
    media = treatment.exercise.vid_url.includes('youtube') ?  // youtube uses iframe
      ( <div className='videoWrapper'>
          <iframe src={ treatment.exercise.vid_url } frameBorder='0' allowFullScreen></iframe>
        </div>
      ) :
      ( <video src={ treatment.exercise.vid_url }></video> )  // html5 native video
  } else {  // if no video, then just the image...
    media = ( <img src={ treatment.exercise.img_url } className='img-responsive' /> )
  }

  return (
    <div className='container'>
      <Helmet title={treatment.exercise.title} />
      <div className='row'>
        <div className='col-md-12'>
            <div className='row'>
              <h1> { `${treatment.exercise.title}` } </h1>
            </div>
        </div>
        <div className='col-md-9'>
          <div className='row'>
            <Paper style={ padded }>
              <div className='row'>
                <div className='col-md-12'>
                  { media }
                </div>
              </div>
              <div className='row'>
                <div className='col-md-6'>
                  <div>
                    <p style={ emphasis }>Description: </p>
                    <p>{ treatment.exercise.description }</p>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div>
                    <p><span style={ emphasis }>Total Time (All Sets):  </span>
                    { treatment.time_per_exercise }</p>
                  </div>
                  <div>
                    <p><span style={ emphasis }>Sets:  </span>
                    { treatment.sets }</p>
                  </div>
                  <div>
                    <p><span style={ emphasis }>Reps:  </span>
                    { treatment.reps }</p>
                  </div>
                  <div>
                    <p><span style={ emphasis }>Resistance:  </span>
                    { treatment.resistance }</p>
                  </div>
                  <div>
                    <p style={ emphasis }>Therapist Notes: </p>
                    <p>{ treatment.notes }</p>
                  </div>
                </div>
              </div>
            </Paper>
          </div>
        </div>
        <div className='col-md-3'>
          <PlanPanel plan={ plan } />
        </div>
      </div>
    </div>
  )
}

// -=-=-=-=-=-= CONTAINER =-=-=-=-=-=-

const mapState = ({ plan }, { params }) => ({
  plan,
  treatment: plan.treatments.find(treatment => treatment.id == params.treatmentId)
})

export default connect(mapState)(Treatment)
