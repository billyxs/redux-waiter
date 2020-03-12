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

export function waiterResponseHandler(
  name,
  { waiterId, responseAction, responseData }
) {
  return (dispatch, getState) => {
    const waiterData = getWaiter(getState(), name);

    // waiter was cleared or destroyed
    if (waiterData.request === null) {
      return waiterData;
    }

    // A new request was made
    // should not listen to this request anymore
    if (waiterId !== waiterData.id) {
      return waiterData;
    }

    // Request was canceled
    if (waiterData.isCanceled) {
      return waiterData;
    }

    dispatch(responseAction(name, responseData));
    return getWaiter(getState(), name);
  };
}

export function callWaiter(name, { requestCreator, params }) {
  return (dispatch, getState) => {
    if (requestCreator || params) {
      dispatch(
        prepareWaiter(name, {
          requestCreator,
          params,
        })
      );
    }
    const waiterData = getWaiter(getState(), name);

    // Check if waiter is currently handling a request
    if (waiterData.request && waiterData.request.then && waiterData.isPending) {
      return waiterData.request;
    }

    if (!waiterData.requestCreator) {
      throw new Error(
        `redux-waiter: requestCreator not found for your waiter named ${name}`
      );
    }

    const request = waiterData.requestCreator(waiterData.params, dispatch);

    dispatch(initRequest(name, { request }));
    const waiterId = getWaiter(getState(), name).id;

    request
      .then((data) =>
        dispatch(
          waiterResponseHandler(name, {
            waiterId,
            responseAction: resolveRequest,
            responseData: data,
          })
        )
      )
      .catch((error) =>
        dispatch(
          waiterResponseHandler(name, {
            waiterId,
            responseAction: rejectRequest,
            responseData: error,
          })
        )
      );

    return request;
  };
}

export const clearAll = () => ({
  type: t.CLEAR_ALL,
});

export const destroyAll = () => ({
  type: t.DESTROY_ALL,
});
