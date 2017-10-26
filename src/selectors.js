import { createSelector } from 'reselect'
import { waiterModel } from './waiter-reducer'

import { NAME } from './constants'

export const getWaiterStore = createSelector(
  state => state[NAME],
  waiterStore => waiterStore || {},
)

export const getWaiter = (state, waiterName) => getWaiterStore(state)[waiterName] || waiterModel

export const getWaiterResponse = (state, waiterName) => getWaiter(state, waiterName).response

export const getWaiterError = (state, waiterName) => getWaiter(state, waiterName).error
