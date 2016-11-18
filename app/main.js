// Libraries
import React from 'react'
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

// Redux Actions and Thunks
import store from './store'

// React Compontents 
import Homepage from './components/Homepage'
import Container from './components/Container' // <--CHANGE

render (
    <Provider store={ store }>
        <Router history={ browserHistory }>
            <Route path="/" component={ Homepage }>
                <Route path="/pathHERE" component={ Container } />  {/* <---CHANGE */}
                <Route path="/otherPATHHERE" component={ Container } /> {/* <---CHANGE */}
                <IndexRoute component={ Homepage } /> {/* <---CHANGE */}
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
)
