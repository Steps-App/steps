import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Helmet from 'react-helmet'
import moment from 'moment'

// material ui
import { Divider, Paper } from 'material-ui'
import FontIcon from 'material-ui/FontIcon'
import { StepsRaisedButton } from '../material-style'

// sub-components
import SidePanel from '../widgets/SidePanel'
import InfoItem from '../widgets/InfoItem'
import { formatTime } from '../../utils'  // helper function
import { primary, active, errorText } from '../colors'  // colors


// Treatment is a stateful component that displays information to a patient
// and possibly a therapist (with minor mods) about a single treatment

// -=-=-=-=-=-= COMPONENT =-=-=-=-=-=-

const Treatment = ({ plan, params }) => {
  if (!Object.keys(plan).length) return null

  const treatment = plan.treatments.find(treatment => treatment.id == params.treatmentId)

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
    media = ( <img src={ treatment.exercise.img_url } style={{ width: '100%' }} /> )
  }

  return (
    <div id='single-treatment'>
      <Helmet title={ treatment.exercise.title } />
      <h1 className='page-header'> { treatment.exercise.title } </h1>
      <div className='treatment-content'>
        <SidePanel>
          <span><h4> { treatment.exercise.title } </h4></span>
          <InfoItem icon="assignment" label="Description" iconColor={ primary }
            content={ treatment.exercise.description } />
          <InfoItem icon="all_inclusive" label="Sets" iconColor={ primary }
            content={ treatment.sets } />
          <InfoItem icon="layers" label="Reps" iconColor={ primary }
            content={ treatment.reps } />
          <InfoItem icon="alarm" label="Time" iconColor={ primary }
            content={ formatTime(treatment.time_per_exercise) } />
          <InfoItem icon="fitness_center" label="Resistance" iconColor={ primary }
            content={ treatment.resistance } />
          {
            treatment.notes ?
              ( <InfoItem icon="speaker_notes" label="Notes"
                content={ treatment.notes } /> ) : null
          }
        <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />
          <span><h4> My Plan </h4></span>
          <InfoItem icon="date_range" iconColor={ primary }
            label="Start" content={ moment(plan.createdAt).format('MMM Do, YYYY') } />
          <InfoItem icon="date_range" iconColor={ active }
            label="Current" content={ moment().format('MMM Do, YYYY') } />
          <InfoItem icon="date_range" iconColor={ errorText }
            label="End" content={ moment(plan.endDate).format('MMM Do, YYYY') } />
          <InfoItem icon="accessibility" label="Therapy Focus"
            content={ plan.therapyFocus } />
          {
            plan.notes ?
            ( <InfoItem icon="speaker_notes" label="Notes"
              content={ plan.notes } /> ) : null
          }
          <Link to='/plan'>
            <StepsRaisedButton fullWidth={true} label="Back to Full Plan" />
          </Link>
        </SidePanel>

      { media }

      </div>
    </div>
  )
}

// -=-=-=-=-=-= CONTAINER =-=-=-=-=-=-

const mapState = ({ plan }, { params }) => ({
  plan
})

export default connect(mapState)(Treatment)
