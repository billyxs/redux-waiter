import { getWaiter, getWaiterResponse, getWaiterError } from '../src'
import { waiterModel } from '../src/waiter-reducer'
import REDUX_MOUNT_POINT from './redux-mount-point'

describe('Selectors', () => {
  describe('getWaiter', () => {
    it('Should return waiter model if namespace does not exist', () => {
      const state = {
        [REDUX_MOUNT_POINT]: {},
      }
      expect(getWaiter(state, 'mywaiter')).toEqual(waiterModel)
    })

    it('Should return waiter contents if namespace does exist', () => {
      const WAITER_NAME = 'mywaiter'
      const WAITER_CONTENT = {
        name: WAITER_NAME,
      }
      const state = {
        [REDUX_MOUNT_POINT]: {
          [WAITER_NAME]: WAITER_CONTENT,
        },
      }
      expect(getWaiter(state, WAITER_NAME)).toEqual(WAITER_CONTENT)
    })
  })

  describe('getWaiterResponse', () => {
    it('Should return default response value of waiter model if namespace does not exist', () => {
      const state = {
        [REDUX_MOUNT_POINT]: {},
      }
      expect(getWaiterResponse(state, 'mywaiter')).toEqual(waiterModel.response)
    })

    it('Should return response if namespace does exist', () => {
      const WAITER_NAME = 'mywaiter'
      const WAITER_CONTENT = {
        response: {
          data: 'mydata',
        },
      }
      const state = {
        [REDUX_MOUNT_POINT]: {
          [WAITER_NAME]: WAITER_CONTENT,
        },
      }
      expect(getWaiterResponse(state, WAITER_NAME)).toEqual(
        WAITER_CONTENT.response,
      )
    })
  })

  describe('getWaiterError', () => {
    it('Should return default error value of waiter model if namespace does not exist', () => {
      const state = {
        [REDUX_MOUNT_POINT]: {},
      }
      expect(getWaiterError(state, 'mywaiter')).toEqual(waiterModel.error)
    })

    it('Should return error if namespace does exist', () => {
      const WAITER_NAME = 'mywaiter'
      const WAITER_CONTENT = {
        error: {
          data: 'mydata',
        },
      }
      const state = {
        [REDUX_MOUNT_POINT]: {
          [WAITER_NAME]: WAITER_CONTENT,
        },
      }
      expect(getWaiterError(state, WAITER_NAME)).toEqual(
        WAITER_CONTENT.error,
      )
    })
  })
})
