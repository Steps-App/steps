import React from 'react'

//material-ui
import { Paper, RaisedButton } from 'material-ui'

 export default (props) => {

   const { plan } = props
   // stylings
   const center = { margin: '0 auto', textAlign: 'center' }
   const fullWidth = { width: '100%' }
   const emphasis = { fontSize: '1.5em', fontWeight: 'bold' }

   return(
     <Paper style={ center }>
       <div>
         <p style={ emphasis }>Plan Focus</p>
         <p>{ plan.therapy_focus }</p>
       </div>
       <div>
         <p style={ emphasis }>Plan Duration</p>
         <p>{ plan.duration } weeks</p>
         <p> Ending on { plan.end_date }</p>
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
