import t from './actionTypes';
import { getWaiter } from './selectors';

export const prepareWaiter = (name, params) => ({
  type: t.PREPARE,
  payload: {
    name,
    ...params,
  },
});

// waiter request lifecycle
export const initRequest = (name, params) => ({
  type: t.INIT,
  payload: {
    name,
    ...params,
  },
});

export const resolveRequest = (name, response) => ({
  type: t.RESOLVE,
  payload: {
    name,
    response,
  },
});

export const rejectRequest = (name, error) => ({
  type: t.REJECT,
  payload: {
    name,
    error,
  },
});

export const cancelRequest = (name) => ({
  type: t.CANCEL,
  payload: {
    name,
  },
});

export const clearWaiter = (name) => ({
  type: t.CLEAR,
  payload: {
    name,
  },
});

export const destroyWaiter = (name) => ({
  type: t.DESTROY,
  payload: {
    name,
  },
});

export function callWaiter(name, { requestCreator, params }) {
  return (dispatch, getState) => {
    if (requestCreator) {
      dispatch(prepareWaiter(name, { requestCreator }));
    }
    const waiterData = getWaiter(getState(), name);

    // Check if waiter is currently handling a request
    if (waiterData.request && waiterData.isPending) {
      return waiterData.request;
    }

    if (!waiterData.requestCreator) {
      throw new Error(
        `redux-waiter: requestCreator not found for your waiter named ${name}`
      );
    }

    const request = waiterData.requestCreator(params, dispatch);
    dispatch(initRequest(name, { request, params }));
    request
      .then((data) => {
        dispatch(resolveRequest(name, data));
        return getWaiter(getState(), name);
      })
      .catch((error) => {
        dispatch(rejectRequest(name, error));
        return getWaiter(getState(), name);
      });

    return request;
  };
}

export const clearAll = () => ({
  type: t.CLEAR_ALL,
});

export const destroyAll = () => ({
  type: t.DESTROY_ALL,
});
