import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';
import Helmet from 'react-helmet'
import { logWorkout } from '../../reducers/plan'
// material ui
import { Paper } from 'material-ui'
import { StepsActionButton, StepsTextField, StepsRaisedButton, StepsIconButton } from '../material-style'
import { secondary, errorText } from '../colors'

import Close from 'material-ui/svg-icons/navigation/close'
import PlayCircleOutline from 'material-ui/svg-icons/av/play-circle-outline'

// Pain indicators offered upon workout completion
const painLevels = {
  1: "No",
  2: "Minor",
  3: "Some",
  4: "Major",
  5: "Serious"
}

// Counter is a local-state component that logs the user's activity to workouts
// -=-=-=-=-=-= COMPONENT =-=-=-=-=-=-

const initialState = {
  elapsed: 0,      // logs time elapsed
  pain: null,      // logs pain
  comments: '',    // logs comments, if any
  interval: null,  // interval for timer
  status: 'ready', // ready, running, complete
  hidden: true,    // pain/comments form hidden until clock done
  submit_error: ''
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
    this.setState({ status: 'running', interval: setInterval(this.tick, 1000) })
  }

  // stop the timer and open the submit form
  onStopClick() {
    clearInterval(this.state.interval)
    this.setState({ status: 'complete', hidden: false })  // open workout feedback form
  }

  // ticks up the elapsed time
  tick() {
    if (this.state.elapsed >= this.props.treatment.time_per_exercise) {
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
    const activity = {
      time: this.state.elapsed,
      pain: this.state.pain,
      comments: this.state.comments,
      patientId: this.props.user.id,
      planId: this.props.treatment.plan_id,
      treatmentId: this.props.treatment.id
    };
    this.props.finished(activity, (err) => {
      if (!err) browserHistory.push('/plan');
      else this.setState({ submit_error: err });
    });
  }

  render() {

    // math for timer
    const mins = Math.floor((this.props.treatment.time_per_exercise - this.state.elapsed) / 60)
    const secs = (this.props.treatment.time_per_exercise - this.state.elapsed) % 60
    // stylings
    const margin = { margin: '15px' }
    const showing = { visibility: this.state.hidden ? 'hidden' : 'visible' }
    const pageTitle = `${this.props.treatment.exercise.title ? this.props.treatment.exercise.title : 'Loading'} Workout`

    return (
      <div id="counter">
        <Helmet title={pageTitle} />
        <Paper style={ {width: 300, height: 400} } className="timer-card">
          <div className="timer-countdown row">
            {/* Numeric Countdown */}
            <p> {`${mins}:${ secs < 10 ? `0${secs}` : secs } `}</p>
          </div>

          <div className="timer-buttons">
            {/* Greenish circular button */}
            <StepsActionButton
              disabled={this.state.status !== 'ready'}
              onTouchTap={ () => this.onStartClick() } style={ margin }>
              <PlayCircleOutline />
            </StepsActionButton>
            {/* Reddish circular button */}
            <StepsActionButton
              backgroundColor={ secondary }
              disabled={this.state.status !== 'running'}
              onTouchTap={ () => this.onStopClick() } secondary={ true } style={ margin }>
              <Close />
            </StepsActionButton>
          </div>

          {/* Emoji pain menu and comment form hidden until time stopped */}
          <div className="workout-data" style={ showing }>
            <div className="workout-pain-buttons">
            {
              Object.keys(painLevels).map(key => (
                <StepsIconButton key={key}
                  className={`workout-pain-button ${this.state.pain === key ? 'selected' : ''}`}
                  tooltip={`${painLevels[key]} Pain`}
                  tooltipPosition="bottom-center"
                  onTouchTap={ () => this.onPainClick(key) } >
                  <img src={require(`../../../src/images/emojis/${key}pain.svg`)} />
                </StepsIconButton>
              ))
            }
            </div>
            <div className="workout-comments">
              <StepsTextField
                hintText="Any notes from the workout?"
                floatingLabelText="Comments"
                multiLine={true}
                rows={1}
                rowsMax={2}
                onChange={ this.onChangeComment }
              />
            </div>
            <div className="workout-submit">
              <StepsRaisedButton label="Done" onTouchTap={ this.handleSubmit }/>
              {
                this.state.submit_error ?
                  <p style={{ color: errorText }}>{ this.state.submit_error }</p> : null
              }
            </div>
         </div>

        </Paper>
      </div>
    )
  }
}

// -=-=-=-=-=-= CONTAINER =-=-=-=-=-=-

const mapStateToProps = ({ user, plan }, { params }) => ({
  user,
  treatment: plan.treatments.find(treatment => treatment.id == params.treatmentId)
})

// action-creator logWorkout(activity) =>
// takes an object containing the local state of the counter as follows:
// { time_per_exercise: seconds, pain: (1-5), comments: 'if any' }
const mapDispatchToProps = (dispatch) => ({
  finished: (activity, done) => dispatch(logWorkout(activity, done))
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
