// The Store
// The store should have four parts -
// 1. The state
// 2. Get the state.
// 3. Listen to the changes on the state.
// 4. Update the state.

function createStore () {
    let state

    const getState = () => state

    return {
        getState
    }
}