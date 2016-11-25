import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

// material ui
import { Paper } from 'material-ui'

// sub-components
import PlanPanel from './PlanPanel.js'

// Treatment is a stateful component that displays information to a patient
// and possibly a therapist (with minor mods) about a single treatment

// -=-=-=-=-=-= COMPONENT =-=-=-=-=-=-

export class Treatment extends Component {

  constructor() {
    super()
    const { plan, treatment } = this.props
    const { exercise } = treatment
  }

  render() {

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-10'>
            <div className='row'>
              <h1> { `${plan.therapy_focus}: ${exercise.title}` }  }</h1>
              <Paper>
                <div className='row'>
                  <div className='col-md-4'>
                    { exercise.vid_url ?
                      ( <video src={ exercise.vid_url }></video> ) :
                      ( <img src={ exercise.img_url } alt={ exercise.title } /> )
                    }
                  </div>
                  <div className='col-md-4'>
                    <div>Title: { exercise.title }</div>
                    <div>Description: { exercise.description }</div>
                    <div>Therapist Notes: { treatment.notes }</div>
                  </div>
                  <div className='col-md-2'>
                    <div>Duration: { treatment.duration }</div>
                    <div>Sets: { treatment.sets }</div>
                    <div>Reps: { treatment.reps }</div>
                  </div>
                </div>
              </Paper>
            </div>
          </div>
          <div className='col-md-2'>
            <PlanPanel plan={ plan } />
          </div>
        </div>
      </div>
    )
  }
}

// -=-=-=-=-=-= CONTAINER =-=-=-=-=-=-

const mapState = ({ user, plan, treatment }) => ({ user, plan, treatment })

// nothing to dispatch

export default connect(mapState)(Treatment)
