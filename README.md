# Redux Waiter

## Installation

`npm i redux-waiter --save`

This gives you access to the reducer, constants, actions, and selectors available


## Add to your combineReducers()

```javascript
import { reducer } from 'redux-waiter'

combineReducers{
  waiter: reducer,
}
```


## Waiter model description and defaults

Each waiter initialized will have these properties.

```javascript

const model = {
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
  onUnmount: (waiter, props) => {
    props.dispatch(customAction())
  },
  clearOnUnmount: true,

  // state actions
  onPending: (waiter, props) => {
    console.log('onPending - ', waiter)
    props.dispatch(loadData(waiter.response))
  },
  onResolve: (waiter, props) => {
    console.log('onResolve - ', waiter)
    props.dispatch(sendError(waiter.error))
  },
  onReject: (waiter, props) => {
    console.log('onReject - ', waiter.error)
  },
  onComplete: (waiter, props) => {
    console.log('onComplete - ', waiter)
  },

  // alternate views
  pendingView: LoadingView,
  rejectedView: FailureView
})(MyComponent)

```


## Example

### Valid Document Link

Create your component with the `connectWaiter`
```javascript
import React from 'react'
import axios from 'axios'

import { connectWaiter } from 'redux-waiter'

const UrlLink = connectWaiter({
  // dynamic waiter name using props
  name: (props) => `link:${props.url}`,
  requestCreator: (params, props) => axios({ url: props.url }),

  // alternate views for the Promise lifecycle
  pendingView: () => (<span>...</span>),
  rejectedView: () => (<span>Invalid link</span>),
})((props) => <a href={props.url}>Click to View</a>)

```

Implement your component in the JSX
```html
...
<UrlLink url='https://link.to.pdf' />'
...
```
