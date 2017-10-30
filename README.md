# Redux Waiter

## Installation

`npm i redux-waiter --save`

This gives you access to the reducer, constants, actions, and selectors available


## Add to your combineReducers()

```
import { reducer } from 'redux-waiter'

combineReducers{
  waiter: reducer,
}
```


## Waiter model description and defaults

```
{
  // incremented after each request
  id: 0,

  // your waiter's name
  name: null,

  // your request to track
  requestCreator: null,

  defaultParams: null,

  // the params for your request to use
  params: null,

  // the promise returned from the requestCreator
  request: null,

  // the result of the promise
  response: null,

  // the error if returned from the promise
  error: null,

  // true if the request is called a second time and isPending
  isRefreshing: false,

  // true when the request is pending
  isPending: false,

  // true when the request returns an error
  isRejected: false,

  // true when the request returns successfully
  isResolved: false,

  // true if the request resolves or rejects
  isCompleted: false,

  // true if the request is cancled
  isCanceled: false,

  // true if the request rejected, and is being called again
  isRetrying: false,

  // start time of request in milliseconds UTC
  startTime: null,

  // end time of request in milliseconds UTC
  endTime: null,

  // difference in milliseconds of start and end times
  elapsedTime: null,

  // last time the model changed in milliseconds UTC
  lastModified: null,

  // how many times the request has been called and returned an error
  // resets after a successful response
  attempts: 0,
}
```


## connectWaiter

`import { connectWaiter } from 'redux-waiter'`

connectWaiter is a higher-order-component that connects the your waiter
promise to another component.
You can listen in on waiter events and dispatch other actions.  You can add
custom views to different waiter states,
as well as add custom actions to the mount and unmount lifecycle events

Below is the full interface for connectWaiter, ordered in the sequence that the actions take place

```javascript
import { connectWaiter } from 'redux-waiter'
import MyComponent from 'path/to/MyComponent'
import notification from 'path/to/notification'

const SearchRequestForm = connectWaiter({
  name: 'my-waiter-name',
  requestCreator: (params, props) => yourAPI.getSomething(params),

  // onMount
  onMount: (props) => {
    props.dispatch(customAction())
  },
  clearOnMount: true,

  // request on mount options
  requestOnMount: true,
  requestOnMountParams: (props) => ({name: 'First', last: 'Last'}),

  // on unmount
  onUnMount: (props, dispatch) => {
    dispatch(customAction())
  },
  clearOnUnmount: true,

  // state actions
  onPending: (waiter, dispatch) => {
    console.log('onPending - ', waiter)
  },
  onResolve: (waiter, dispatch) => {
    console.log('onResolve - ', waiter)
  },
  onReject: (waiter, dispatch) => {
    console.log('onReject - ', waiter.error)
  },
  onComplete: (waiter, dispatch) => {
    console.log('onComplete - ', waiter)
  },

  // alternate views
  pendingView: LoadingView,
  rejectedView: FailureView
})(MyComponent)

```
