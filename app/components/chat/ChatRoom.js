import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Helmet from 'react-helmet'
import Messages from './Messages'
import Messenger from './Messenger'

// material ui
import { Paper } from 'material-ui'

// ChatRoom is a local state component that handles messages to/from
// patient and therapist

// -=-=-=-=-=-= COMPONENT =-=-=-=-=-=-

export class ChatRoom extends Component {

  constructor(props) {
    super(props)
    // local state of user, messages array, and 'wipe clean' message
    this.state = {
      user: this.props.user.first_name + ' ' + this.props.user.last_name,
      messages: [],
      message: ''
    }
    // pick a unique room for the therapist-patient chat based on patient id
    this.room = this.props.user.role === 'patient' ?
      this.props.user.id.toString() : this.props.currentPatient.id.toString()
    // bind our methods to use in render()
    this.onMessageReceived = this.onMessageReceived.bind(this)
    this.onMessageSent = this.onMessageSent.bind(this)
    this.onMessageChange = this.onMessageChange.bind(this)
  }

  componentDidMount() {
    this.socket = io.connect(`localhost:8080/${this.room}`) // init socket
    this.socket.emit('userEnter', { room: this.room, user: this.state.user })
    this.socket.on('newMessage', this.onMessageReceived)
  }

  componentWillUnmount() {
    this.socket.emit('userLeave', { room: this.room, user: this.state.user })
  }

  onMessageReceived(data) {
    let message = {
      user: data.user,
      text: data.text,
      align: 'right'
    }
    this.setState({ messages: [...this.state.messages, message] })
  }

  onMessageSent(evt) {
    evt.preventDefault()
    let message = {
      user: this.state.user,
      text: this.state.message,
      align: 'left'
    }
    // add message to local state
    this.setState({ messages: [...this.state.messages, message] })
    // broadcast the message
    this.socket.emit('newMessage', message)
     // wipe clean the message prop
    this.setState({ message: '' })
  }

  onMessageChange(evt) {
    this.setState({ message: evt.target.value })
  }

  render() {

    return (
      <div className='container chat'>
      <Helmet title='Therapist messaging' />
        <Paper className='col-sm-12 col-md-6 col-md-offset-3'>
          <Messages messages={ this.state.messages } />
          <Messenger
            message={ this.state.message }
            onMessageChange={ this.onMessageChange }
            onMessageSent={ this.onMessageSent }
          />
        </Paper>
      </div>
    )
  }
}

// -=-=-=-=-=-= CONTAINER =-=-=-=-=-=-

const mapState = ({ user, currentPatient }) => ({ user, currentPatient })

export default connect(mapState)(ChatRoom)
