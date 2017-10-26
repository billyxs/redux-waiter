# Redux Waiter

## Installation

`npm i redux-waiter --save`

This gives you access to the reducer, constants, actions, and selectors available

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
  requestOnMountBody: (props) => ({name: 'First', last: 'Last'}),

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
