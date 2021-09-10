// THE LIBRARY CODE
// The Store
// The store should have four parts -
// 1. The state
// 2. Get the state.
// 3. Listen to the changes on the state.
// 4. Update the state.

function createStore (reducer) {
    let state
    let listeners = []

    const getState = () => state

    // To listen for state change
    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter((l) => l !== listener)
        }
    }

    // To update the state
    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach((listener) => listener())
    }

    return {
        getState,
        subscribe,
        dispatch,
    }
}

// THE APP CODE
// The reducer function
// It will be a pure function that takes current state and action
// It return the new state based on the action
function todos(state = [], action) {
    switch (action.type) {
        case 'ADD_TODO' :
            return state.concat([action.todo])
        case 'REMOVE_TODO' :
            return state.filter((todo) => todo.id !== action.id)
        case 'TOGGLE_TODO' :
            return state.map((todo) => todo.id !== action ? todo :
            Object.assign({}, todo, { complete: !todo.complete }))
        default :
            return state
    }
}


// Goals Reducer
function goals(state = [], action) {
    switch (action.type) {
        case 'ADD_GOAL' :
            return state.concat([action.goal])
        case 'REMOVE_GOAL' :
            return state.filter((goal) => goal.id !== action.id)
        default :
            return state
    }
}

const store = createStore(todos)

store.subscribe(() => {
    console.log('The new state is: ' + store.getState())
})

store.dispatch( {
    type: 'ADD_TODO',
    todo: {
        id: 0,
        name: 'Learn Redux',
        complete: false
    }
} )