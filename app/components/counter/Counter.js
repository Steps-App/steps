import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logActivity } from '../../reducers/workouts'
// material ui
import { CircularProgress, Drawer, FloatingActionButton, IconButton, Paper, RaisedButton, TextField } from 'material-ui'
import Close from 'material-ui/svg-icons/navigation/close'
import PlayCircleOutline from 'material-ui/svg-icons/av/play-circle-outline'

// Counter is a local-state component that logs the user's activity to workouts
// -=-=-=-=-=-= COMPONENT =-=-=-=-=-=-

const initialState = {
  elapsed: 0,      // logs time elapsed
  pain: null,      // logs pain
  comments: '',    // logs comments, if any
  interval: null,  // interval for timer
  hidden: true     // pain/comments form hidden until clock done
}

class Counter extends Component {

  constructor(props) {
    super(props)
    this.state = initialState

    // bind all our action handlers
    this.onStartClick = this.onStartClick.bind(this)
    this.onStopClick = this.onStopClick.bind(this)
    this.tick = this.tick.bind(this)
    this.onPainClick = this.onPainClick.bind(this)
    this.onChangeComment = this.onChangeComment.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // start the timer
  onStartClick() {
    this.setState({ interval: setInterval(this.tick, 1000) })
  }

  // stop the timer and open the submit form
  onStopClick() {
    clearInterval(this.state.interval)
    this.setState({ hidden: false })  // open workout feedback form
  }

  // ticks up the elapsed time
  tick() {
    if (this.state.elapsed >= this.props.treatment.time) {
      return this.onStopClick()
    }
    this.setState({ elapsed: this.state.elapsed + 1 })
  }

  // pain value on user click
  onPainClick(pain) {
    this.setState({ pain })
  }

  // comment on user input
  onChangeComment(evt) {
    this.setState({ comments: evt.target.value })
  }

  // on submit, dispatch all user values + logged elapsed time plus
  // other required values for workout creation
  handleSubmit(evt) {
    evt.preventDefault()
    let activity = {
      time: this.state.elapsed,
      pain: this.state.pain,
      comments: this.state.comments,
      patientId: this.props.user.id,
      planId: this.props.plan.id,
      treatmentId: this.props.treatment.id
    }
    this.props.finished(activity)
    this.setState(initialState)
  }

  render() {

    // math for timer
    const mins = Math.floor((this.props.treatment.time - this.state.elapsed) / 60)
    const secs = (this.props.treatment.time - this.state.elapsed) % 60
    // stylings
    const center = { margin: '0 auto', textAlign: 'center' }
    const margin = { margin: '15px' }
    const svg = { height: '36px', width: '36px' }
    const font = { fontSize: '7em' }
    const showing = { display: this.state.hidden ? 'none' : 'block' }
    const emoji = { height: '16px', width: '16px' }

    return (
      <div>
        <Paper style={ {width: 300, height: 400} }>

          <div className="row" style={center}>
            {/* Numeric Countdown */}
            <p style={ font }> { mins }:{ secs < 10 ? `0${secs}` : secs } </p>
          </div>

          <div className="row" style={center}>
            {/* Greenish circular button */}
            <FloatingActionButton onClick={ () => this.onStartClick() } style={ margin }>
              <PlayCircleOutline style={ svg } />
            </FloatingActionButton>
            {/* Reddish circular button */}
            <FloatingActionButton onClick={ () => this.onStopClick() } secondary={ true } style={ margin }>
              <Close style={ svg } />
            </FloatingActionButton>
          </div>

          {/* Emoji pain menu and comment form hidden until time stopped */}
          <div className="row" style={ showing }>
            <div style={ center }>
              <IconButton
                tooltip="No Pain"
                tooltipPosition="bottom-center"
                onClick={ () => this.onPainClick(1) }
              >
                <img src={require("../../../src/images/emojis/1pain.svg")} style={ emoji } />
              </IconButton>
              <IconButton
                tooltip="Minor Pain"
                tooltipPosition="bottom-center"
                onClick={ () => this.onPainClick(2) }
              >
                <img src={require("../../../src/images/emojis/2pain.svg")} style={ emoji } />
              </IconButton>
              <IconButton
                tooltip="Some Pain"
                tooltipPosition="bottom-center"
                onClick={ () => this.onPainClick(3) }
              >
                <img src={require("../../../src/images/emojis/3pain.svg")} style={ emoji } />
              </IconButton>
              <IconButton
                tooltip="Major Pain"
                tooltipPosition="bottom-center"
                onClick={ () => this.onPainClick(4) }
              >
                <img src={require("../../../src/images/emojis/4pain.svg")} style={ emoji } />
              </IconButton>
              <IconButton
                tooltip="Serious Pain"
                tooltipPosition="bottom-center"
                onClick={ () => this.onPainClick(5) }
              >
                <img src={require("../../../src/images/emojis/5pain.svg")} style={ emoji } />
              </IconButton>
            </div>
            <div style={ center }>
              <TextField
                hintText="Any notes from the workout?"
                floatingLabelText="Comments"
                value={ this.state.comments }
                onChange={ this.onChangeComment }
              />
            </div>
            <div style={ center }>
              <RaisedButton label="Done!" onClick={ this.handleSubmit }/>
            </div>
         </div>

        </Paper>
      </div>
    )
  }
}

// -=-=-=-=-=-= CONTAINER =-=-=-=-=-=-

// FOR PRODUCTION, AIM TO USE BELOW
// const mapStateToProps = ({ user, plan, treatment }) => ({ user, plan, treatment })

// FOR TESTING ONLY !!!!!!!!
const mapStateToProps = (state) => ({
  user: { id: 1 },
  plan: { id: 1 },
  treatment: { id: 1, time: 30 }
})

// action-creator logActivity(activity) =>
// takes an object containing the local state of the counter as follows:
// { time_per_exercise: seconds, pain: (1-5), comments: 'if any' }
const mapDispatchToProps = (dispatch) => ({
  finished: (activity) => dispatch(logActivity(activity))
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
