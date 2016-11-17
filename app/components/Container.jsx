// import redux, react
import React, { Component } from 'react'
import { connect } from 'react-redux'

// -=-=-=-=-=-= COMPONENT =-=-=-=-=-=-

export class App extends Component {

  render () {

    return (
      <div id="main">
        <div className="row">
          { this.props.children }
        </div>
      </div>
    )
  }
}

// -=-=-=-=-= CONTAINER =-=-=-=-=-=-

const mapStateToProps = state => ({
  // some state to props mapping
})

const mapDispatchToProps = dispatch => ({
  // some dispatch to props mapping
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(App);
