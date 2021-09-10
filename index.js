// The reducer function
// It will be a pure function that takes current state and action
// It return the new state based on the action
function todos(state = [], action) {
    if (action.type === 'ADD_TODO') {
        return state.concat([action.todo])
    }

    return state
}

// The Store
// The store should have four parts -
// 1. The state
// 2. Get the state.
// 3. Listen to the changes on the state.
// 4. Update the state.

function createStore () {
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
        state = todos(state, action)
        listeners.forEach((listener) => listener())
    }

    return {
        getState,
        subscribe,
        dispatch,
    }
}

const store = createStore()

store.subscribe(() => {
    console.log('The new state is: ', store.getState())
})

// subscribe returns a function, that can be used to unsubscribe the listener
const unsubscribe = store.subscribe(() => {
    console.log('The store changed')
})

unsubscribe()