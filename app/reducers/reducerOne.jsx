// Initial State if not null
const initialState = {
  // TO DO
}

// -=-=-=-= ACTIONS =-=-=-=-=-

const ACTION = 'ACTION'    // <-- CHANGE

// -=-=-=-= ACTION-CREATORS =-=-=-=-=-

export const doAction = (input) => {  // <-- CHANGE
  type: ACTION,
  input
}

export const thunkDispatch = () => {  // <-- CHANGE
  const thunk = (dispatch) => {
    // SOMETHING ASYNC
    return thunk
  }
}


// -=-=-=-= REDUCER =-=-=-=-=-

const reducerOne = (state = initialState, action) => {  // <--- CHANGE
  switch (action.type) {
    case ACTION:
      return Object.assign({}, state, { someProp: newThing })
    default: return state
  }
}

export default reducerOne
