import t from './actionTypes'
import waiter from './waiter-reducer'

const initialState = {}

const reducerMap = {
  // all the waiters
  [t.RESET_ALL]: () => initialState,
  [t.CLEAR_ALL]: state => Object.values(state).reduce((acc, curr) => {
    // eslint-disable-next-line no-param-reassign
    acc[curr.name] = waiter(state[curr.name], { type: t.CLEAR })
    return acc
  }, {}),

  // waiter options
  [t.PREPARE]: (state, payload) => ({
    ...state,
    [payload.name]: waiter(state[payload.name], { type: t.PREPARE, payload }),
  }),
  [t.INIT]: (state, payload) => ({
    ...state,
    [payload.name]: waiter(state[payload.name], { type: t.INIT, payload }),
  }),
  [t.RESOLVE]: (state, payload) => ({
    ...state,
    [payload.name]: waiter(state[payload.name], { type: t.RESOLVE, payload }),
  }),
  [t.REJECT]: (state, payload) => ({
    ...state,
    [payload.name]: waiter(state[payload.name], { type: t.REJECT, payload }),
  }),
  [t.COMPLETE]: (state, payload) => ({
    ...state,
    [payload.name]: waiter(state[payload.name], { type: t.COMPLETE, payload }),
  }),
  [t.CLEAR]: (state, payload) => ({
    ...state,
    [payload.name]: waiter(state[payload.name], { type: t.CLEAR, payload }),
  }),
  [t.DESTROY]: (state, payload) => Object.keys(state).reduce((acc, curr) => {
    if (curr === payload.name) {
      return acc
    }
    return { ...acc, [curr]: state[curr] }
  }, {}),
  [t.CANCEL_ALL]: state => state.map(w => waiter(w, { type: t.CANCEL })),
  [t.DESTROY_ALL]: () => initialState,
}

export default (state = initialState, action) => {
  const reducer = reducerMap[action.type]

  return reducer
      ? reducer(state, action.payload)
      : state
}
