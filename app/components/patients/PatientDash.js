// import redux, react
import React, { Component } from 'react'
import { connect } from 'react-redux'


//Material UI
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';


// -=-=-=-=-=-= COMPONENT =-=-=-=-=-=-

export class PatientDash extends Component {

  constructor(props) {
    super(props) 
    this.state = {}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
    
  handleChange(field, value) {
    let newState = {};
    newState[field] = value
    this.setState(newState);
  }

  handleSubmit (evt) {
    evt.preventDefault();
  }


  render() {

  const styles = {
    root: {
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      width: '100%'
    },
    gridList: {
      display: 'flex',
      flexWrap: 'nowrap',
      overflowX: 'auto',
    },
    titleStyle: {
      color: 'rgb(0, 0, 0)',
    },
  };

  
    return (

     <div style={styles.root}>
      <GridList style={styles.gridList} cols={2.2}>
          <GridTile title='Excercises to Complete' titleStyle={styles.titleStyle}>
             500
          </GridTile>

          <GridTile title='Days Left' titleStyle={styles.titleStyle}>
             5
          </GridTile>

          <GridTile title='Status' titleStyle={styles.titleStyle}>
             :)
          </GridTile>
          
    
      </GridList>
    </div>

    )
  }
}

// -=-=-=-=-= CONTAINER =-=-=-=-=-=-

const mapDispatchtoProps = dispatch => ({ 
  something: credentials => {
    console.log('Something:', credentials)
  },
  something2: (credentials, displayErr) => {
    console.log('Something2:', credentials)
  }
})

export default connect(null, mapDispatchtoProps)(PatientDash);
