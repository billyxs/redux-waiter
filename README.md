# Redux Waiter

## Installation

`npm i redux-waiter --save`

This gives you access to the reducer, constants, actions, and selectors available


## Add to your combineReducers()

```javascript
import waiter from 'redux-waiter'

combineReducers{
  reduxWaiter: waiter.reducer
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

## Actions

### callWaiter(waiterName, { params, requestCreator })

The call action will invoke the requestCreator with the supplied params and
store all waiter processes to the waiterName given.

```
import { callWaiter } from 'redux-waiter'

dispatch(
  callWaiter('get-toy', {
    { id: '1'},
    requestCreator: (params) => getToyPromise(params.id)
  })
)
```

### prepareWaiter(waiterName, { params, requestCreator })

Prepare is the same as callWaiter, but it only store up params and the request
creator to the waiterName. It will not invoke the requestCreator until
callWaiter(waiterName) is dispatched

```
import { prepareWaiter } from 'redux-waiter'

dispatch(
  prepareWaiter('get-toy', {
    { id: '1'},
    requestCreator: (params) => getToyPromise(params.id)
  })
)

// then somewhere else you can call it
dispatch(callWaiter('get-toy'))
```

### clearWaiter(waiterName)

Clear will reset the waiter as if it was never called. This removes all
params, response, and error data. The waiter stays in the store and can be
used again.

```javascript
import { clearWaiter } from 'redux-waiter'

// In you redux environment
dispatch(clearWaiter('waiter-name'))
```


### destroyWaiter(waiterName)

Destroy will remove the waiter from the store. It will not longer be
accessible unless initialized again.

```javascript
import { destroyWaiter } from 'redux-waiter'

// In you redux environment
dispatch(destroyWaiter('waiter-name'))
```

## Selectors

### getWaiter(state, waiterName)

Get all the waiter data from the store by it's name.

```javascript
import { getWaiter } from 'redux-waiter'

// In your mapStateToProps somewhere
(state) => getWaiter(state, 'get-toy',)

```
### getWaiterResponse(state, waiterName)

Get only the response of the promise by the waiter name. Returns null if no
response has been given.

```javascript
import { getWaiterResponse } from 'redux-waiter'

// In your mapStateToProps somewhere
(state) => getWaiterResponse(state, 'get-toy',)

```

### getWaiterError(state, waiterName)

Get only the error of the promise by the waiter name. Returns null if no error
was given.

```javascript
import { getWaiterError } from 'redux-waiter'

// In your mapStateToProps somewhere
(state) => getWaiterError(state, 'get-toy',)

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
  requestCreator: (params) => httpClient({ url: params.url }),
  requestOnMountParams: (props) => ({ url: props.url }),

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
