/* import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import { shallow } from 'enzyme'

import reducer from '../src/reducer'
import connectWaiter from '../src/connectWaiter'

import REDUX_MOUNT_POINT from './redux-mount-point'

const middleware = [thunk.withExtraArgument({})]

const initialState = combineReducers({
  [REDUX_MOUNT_POINT]: reducer,
})

const store = createStore(
  initialState,
  {},
  compose(
    applyMiddleware(...middleware),
  )
)

function mountComponent(Component) {
  return mount(
    <Provider store={store}>
      <Component />
    </Provider>
  )
}

function getWaiterProps(wrapper) {
  return wrapper.find('WaiterEvent').props()
}

describe('(Redux Waiter) Connect Waiter', function () {
  describe('(export)', function() {
    it('Should be exported as a function.', function () {
      expect(connectWaiter).to.be.a('function')
    })
  })

  describe('should resolve waiter view', function() {
    const MOCK_RESULT = {
      dones: true
    }

    const Component = connectWaiter({
      name: 'mywaiter',
      requestCreator: () => new Promise((resolve, reject) => {
        setTimeout(() => resolve(MOCK_RESULT), 1500)
      }),
      requestOnMountParams: () => ({ dones: true }),
    })((props) => (
      <div>Hello</div>
    ))

    it('Should render with pending state', function(done) {
      this.timeout(1000)
      const wrapper = mountComponent(Component)
      setTimeout(() => {
        const props = getWaiterProps(wrapper)
        expect(props.response).to.equal(null)
        expect(props.error).to.equal(null)

        expect(props.isPending).to.equal(true)
        expect(props.isCompleted).to.equal(false)
        expect(props.isResolved).to.equal(false)
        expect(props.isRejected).to.equal(false)
        expect(props.isCanceled).to.equal(false)
        expect(props.isRefreshing).to.equal(false)
        expect(props.isRetrying).to.equal(false)
        done()
      }, 10)
    })

    it('Should render with resolved state', function(done) {
      this.timeout(2000)
      const wrapper = mountComponent(Component)
      setTimeout(() => {
        const props = getWaiterProps(wrapper)

        expect(props.response).to.equal(MOCK_RESULT)
        expect(props.error).to.equal(null)

        expect(props.isPending).to.equal(false)
        expect(props.isCompleted).to.equal(true)
        expect(props.isResolved).to.equal(true)
        expect(props.isRejected).to.equal(false)
        expect(props.isCanceled).to.equal(false)
        expect(props.isRefreshing).to.equal(false)
        expect(props.isRetrying).to.equal(false)
        done()
      }, 1600)
    })

  })

  describe('should reject waiter view', function() {
    const MOCK_ERROR = {
      message: 'ERROR MESSAGE'
    }

    const Component = connectWaiter({
      name: 'rejectedWaiter',
      requestCreator: () => new Promise((resolve, reject) => {
        setTimeout(() => reject(MOCK_ERROR), 1500)
      }),
      requestOnMount: true,
    })((props) => (
      <div>Hello</div>
    ))

    it('Should render with pending state', function(done) {
      this.timeout(1000)
      const wrapper = mountComponent(Component)
      setTimeout(() => {
        const props = getWaiterProps(wrapper)
        expect(props.response).to.equal(null)
        expect(props.error).to.equal(null)

        expect(props.isPending).to.equal(true)
        expect(props.isCompleted).to.equal(false)
        expect(props.isResolved).to.equal(false)
        expect(props.isRejected).to.equal(false)
        expect(props.isCanceled).to.equal(false)
        expect(props.isRefreshing).to.equal(false)
        expect(props.isRetrying).to.equal(false)
        done()
      }, 10)
    })

    it('Should render with rejected state', function(done) {
      this.timeout(2000)
      const wrapper = mountComponent(Component)
      setTimeout(() => {
        const props = getWaiterProps(wrapper)

        expect(props.response).to.equal(null)
        expect(props.error).to.equal(MOCK_ERROR)

        expect(props.isPending).to.equal(false)
        expect(props.isCompleted).to.equal(true)
        expect(props.isResolved).to.equal(false)
        expect(props.isRejected).to.equal(true)
        expect(props.isCanceled).to.equal(false)
        expect(props.isRefreshing).to.equal(false)
        expect(props.isRetrying).to.equal(false)
        done()
      }, 1600)
    })
  })
})

*/
