import React from 'react'
import { Link } from 'react-router'
import moment from 'moment'

//material-ui
import { Paper, RaisedButton } from 'material-ui'

 export default (props) => {

   const { plan } = props
   // stylings
   const center = { margin: '0 auto', textAlign: 'center' }
   const fullWidth = { width: '100%' }
   const emphasis = { fontWeight: 'bold' }
   const padded = { padding: '15px' }

   return(
     <Paper style={ padded }>
       <div>
         <p style={ emphasis }>Plan Focus</p>
         <p>{ plan.therapy_focus }</p>
       </div>
       <div>
         <p style={ emphasis }>Plan Duration</p>
         <p>{ plan.duration } weeks</p>
         <p> Ending on { moment(plan.end_date).format('MMMM Do YYYY') }</p>
       </div>
       <div>
         <p style={ emphasis }>Plan Notes</p>
         <p>{ plan.notes }</p>
       </div>
       <div>
         <Link to='/plan'>
           <RaisedButton label='Return to Plan View' primary={ true } style={ fullWidth }/>
         </Link>
       </div>
     </Paper>
   )
}
