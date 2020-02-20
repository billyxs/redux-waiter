import * as actions from './actions';
import actionTypes from './actionTypes';
import * as constants from './constants';
import * as selectors from './selectors';
import _reducer from './reducer';

import _connectWaiter from './connectWaiter';

export const connectWaiter = _connectWaiter;

// reducer
export const reducer = _reducer;

// selectors
export const getWaiter = selectors.getWaiter;
export const getWaiterResponse = selectors.getWaiterResponse;
export const getWaiterError = selectors.getWaiterError;

// actions
export const {
  prepareWaiter,
  callWaiter,
  clearWaiter,
  destroyWaiter,
  clearAll,
  destroyAll,
} = actions;

export default {
  actions,
  actionTypes,
  constants,
  selectors,
  reducer,
};
