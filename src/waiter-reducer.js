import t from './actionTypes'

export const waiterModel = {
  id: 0, // incremented after each request
  name: null,

  requestCreator: null,
  transformResponse: null,
  defaultParams: null,

  params: null,
  request: null,
  response: null,
  error: null,

  isRefreshing: false,
  isPending: false,
  isRejected: false,
  isResolved: false,
  isCompleted: false,
  isCanceled: false,
  isRetrying: false,

  startTime: null,
  endTime: null,
  elapsedTime: null,

  lastModified: null,
  attempts: 0,
}

function getTime() {
  return (new Date()).getTime()
}

const reducerMap = {
  [t.PREPARE]: (state, { name, requestCreator, getParams }) => ({
    ...state,
    name,
    requestCreator: requestCreator || state.requestCreator,
    getParams: getParams || state.getParams,
  }),
  [t.INIT]: (state, payload) => {
    const {
      request,
      name,
    } = payload

    const isRefreshing = !!state.response

    const id = state.id + 1

    return {
      ...state,

      id,
      name,

      request,
      error: null,

      isRefreshing,
      isPending: true,
      isResolved: false,
      isRejected: false,
      isCompleted: false,
      isCanceled: false,
      isRetrying: false,

      startTime: getTime(),
      lastModified: new Date(),
    }
  },
  [t.RESOLVE]: (state, payload) => ({
    ...state,
    response: payload.response,
    isPending: false,
    isResolved: true,
    isRejected: false,
    isCompleted: true,
    isCanceled: false,
    error: null,
    endTime: getTime(),
    elapsedTime: getTime() - state.startTime,
    lastModified: new Date(),
  }),
  [t.REJECT]: (state, payload) => ({
    ...state,
    response: null,
    isPending: false,
    isResolved: false,
    isRejected: true,
    isCompleted: true,
    isCanceled: false,
    error: payload.error,
    endTime: getTime(),
    elapsedTime: getTime() - state.startTime,
    lastModified: new Date(),
  }),
  [t.CANCEL]: state => ({
    ...state,
    request: null,
    response: null,
    isPending: false,
    isResolved: false,
    isRejected: false,
    isCompleted: false,
    isCanceled: true,
    endTime: getTime(),
    elapsedTime: getTime() - state.startTime,
    lastModified: new Date(),
  }),
  [t.CLEAR]: state => ({
    ...state,

    params: null,
    request: null,
    response: null,
    error: null,

    isRefreshing: false,
    isPending: false,
    isRejected: false,
    isResolved: false,
    isCompleted: false,
    isCanceled: false,
    isRetrying: false,

    startTime: null,
    endTime: null,
    elapsedTime: null,

    lastModified: null,
    attempts: 0,
  }),
}

export default (state = waiterModel, action) => {
  const reducer = reducerMap[action.type]

  return reducer
      ? reducer(state, action.payload)
      : state
}
