//libraries
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import moment from 'moment'
import Helmet from 'react-helmet'

// sub-components
import Notifications from './Notifications'
import Messages from './Messages'
import Messenger from './Messenger'
import SidePanel from '../widgets/SidePanel'
import InfoItem from '../widgets/InfoItem'

// helpers
import { fullName } from '../../utils'
import { PATIENT } from '../../constants'
// material ui
import { Paper } from 'material-ui'

// constant
import { PLACEHOLDER } from '../../constants'

// ChatRoom is a local state component that handles messages to/from
// patient and therapist

// -=-=-=-=-=-= COMPONENT =-=-=-=-=-=-

export class ChatRoom extends Component {

  constructor(props) {
    super(props)
    // local state of user, messages array, and 'wipe clean' message
    this.state = {
      user: this.props.user,
      messages: [],
      message: '',
      notifications: PLACEHOLDER
    }
    // pick a unique room for the therapist-patient chat based on patient id
    this.room = this.props.params.room
    // counter for unique message id
    this.counter = 0
    // bind our methods to use in render()
    this.onMessageReceived = this.onMessageReceived.bind(this)
    this.onMessageSent = this.onMessageSent.bind(this)
    this.onMessageChange = this.onMessageChange.bind(this)
    this.onNotification = this.onNotification.bind(this)
  }

  componentDidMount() {
    // initialize client socket
    this.socket = io.connect()
    // let server know the room to 'speak' in and that a user has entered that room
    this.socket.emit('userEnter', { room: this.room, user: this.state.user })
    // workhorse function on client side for message handling
    this.socket.on('newMessage', this.onMessageReceived)
    this.socket.on('notification', this.onNotification)
  }

  componentWillUnmount() {
    // notify departure on chat close
    this.socket.emit('userLeave', { room: this.room, user: this.state.user })
  }

  onMessageReceived(data) {
    let message = {}
    if (data.user.id === this.state.user.id) {
      message = {
        id: ++this.counter,
        user: data.user, // messages have a user with img and name
        text: data.text, // and a regular font text that follows
        align: 'right'   // messages from you are green and on the right
      }
    } else {
      message = {
        id: ++this.counter,
        user: data.user,
        text: data.text,
        align: 'left'   // messages from chat partner are blue and on the left
      }
    }
    // put message on the local state for rendering
    this.setState({ messages: [...this.state.messages, message] })
  }

  onMessageSent(evt) {
    evt.preventDefault()
    let message = {
      user: this.state.user,
      text: this.state.message,
    }
    // broadcast the message
    this.socket.emit('newMessage', message)
     // wipe clean the message prop
    this.setState({ message: '' })
  }

  onMessageChange(evt) {
    this.setState({ message: evt.target.value })
    this.socket.emit('typing', { user: this.state.user })
  }
 // these are all user actions, not limited to notifications to a therapist
 // of a patient being in the chat, which alone are dispatched to the redux store
  onNotification(data) {
    if (this.state.notifications === PLACEHOLDER) {  // prevent notification "races"
      this.setState({ notifications: data })
      setTimeout(() => this.setState({ notifications: PLACEHOLDER }), 4000)
    }
  }

  render() {

    const { user, currentPatient, therapist } = this.props

    return (
      <div className='chat'>
        <Helmet title='Chat' />
          <Paper
            className='chatroom'
            style={{ height: '100%' }}>
            <Notifications notifications={ this.state.notifications } />
            <Messages messages={ this.state.messages } />
            <Messenger
              message={ this.state.message }
              onMessageChange={ this.onMessageChange }
              onMessageSent={ this.onMessageSent } />
          </Paper>
          {
            user.role === PATIENT ?
              <SidePanel imgURL={ therapist.img_URL }>
                <InfoItem icon="person" label="Therapist"
                content={ fullName(therapist) } />
                <InfoItem icon="domain" label="Practice"
                content={ therapist.practice_name } />
              </SidePanel> :
              <SidePanel imgURL={ currentPatient.img_URL }>
                <InfoItem icon="person" label="Name"
                content={ fullName(currentPatient) } />
                <InfoItem icon="fingerprint" label="Patient ID"
                content={ currentPatient.emr_id } />
                <InfoItem icon="event" label="DOB"
                content={ currentPatient.DOB ? moment(currentPatient.DOB).format('MMM Do, YYYY') : 'N/A' } />
                <InfoItem icon="assignment_ind" label="Gender"
                content={ currentPatient.gender ? currentPatient.gender : 'N/A' } />
              </SidePanel>
          }
      </div>
    )
  }
}

// -=-=-=-=-=-= CONTAINER =-=-=-=-=-=-

const mapState = ({ user, currentPatient, therapist }) => ({ user, currentPatient, therapist })

export default connect(mapState)(ChatRoom)
