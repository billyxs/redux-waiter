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
export const callWaiter = actions.callWaiter;
export const clearWaiter = actions.clearWaiter;
export const prepareWaiter = actions.prepareWaiter;
export const destroyWaiter = actions.destroyWaiter;

export default {
  actions,
  actionTypes,
  constants,
  selectors,
  reducer,
};
