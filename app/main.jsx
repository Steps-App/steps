// import react, redux, and react-routing
import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'

// import component containers
import Container from './components/Container' // <--CHANGE

render (
    <Provider store={ store }>
        <Router history={ browserHistory }>
            <Route path="/" component={ Container }>
                <Route path="/pathHERE" component={ otherContainer } />  {/* <---CHANGE */}
                <Route path="/otherPATHHERE" component={ anotherContainer } /> {/* <---CHANGE */}
                <IndexRoute component={ otherContainer } /> {/* <---CHANGE */}
            </Route>
        </Router>
    </Provider>,
    document.getElementById('main')
)
