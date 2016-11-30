// import redux, react
import React from 'react'
import { Link } from 'react-router'


// -=-=-=-=-=-= COMPONENT =-=-=-=-=-=-

export default () => (
  <div className="not-found">
    <h1><p> Sorry, that page doesn/'t exist! </p></h1>
    <h4><p> Please <Link to="/">click here</Link> to go home.</p></h4>
  </div>

)
