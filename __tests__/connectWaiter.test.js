import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import enzyme, { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';

import reduxWaiter, { connectWaiter, reducer } from '../src';
import { waiterModel } from '../src/waiter-reducer';

import REDUX_MOUNT_POINT from './redux-mount-point';

enzyme.configure({ adapter: new Adapter() });
const middleware = [thunk.withExtraArgument({})];

const initialState = combineReducers({
  [REDUX_MOUNT_POINT]: reducer,
});

const store = createStore(
  initialState,
  {},
  compose(applyMiddleware(...middleware))
);

function mountComponent(Component) {
  return mount(
    <Provider store={store}>
      <Component />
    </Provider>
  );
}

function getWaiterProps(wrapper) {
  return wrapper.find('WaiterEvent').props();
}

describe('(Redux Waiter) Connect Waiter', () => {
  describe('(export)', () => {
    it('Should be exported as a function.', () => {
      expect(typeof connectWaiter).toBe('function');
    });
  });
  describe('should resolve waiter view', () => {
    const MOCK_RESULT = {
      dones: true,
    };

    const Component = connectWaiter({
      name: 'mywaiter',
      requestCreator: () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(MOCK_RESULT), 1000);
        }),
      requestOnMountParams: () => MOCK_RESULT,
    })(() => <div>Hello</div>);

    it('Should render with pending state', async () => {
      expect.assertions(13);
      const wrapper = mountComponent(Component);
      await new Promise((resolve) => setTimeout(resolve, 10));
      const { waiter } = getWaiterProps(wrapper);
      expect(waiter.response).toBe(null);
      expect(waiter.error).toBe(null);

      expect(waiter.isPending).toBe(true);
      expect(waiter.isCompleted).toBe(false);
      expect(waiter.isResolved).toBe(false);
      expect(waiter.isRejected).toBe(false);
      expect(waiter.isCanceled).toBe(false);
      expect(waiter.isRefreshing).toBe(false);
      expect(waiter.isRetrying).toBe(false);

      expect(typeof waiter.startTime).toBe('number');
      expect(typeof waiter.lastModified).toBe('number');
      expect(waiter.endTime).toBe(null);
      expect(waiter.elapsedTime).toBe(null);
    });

    it('Should render with resolved state', async () => {
      expect.assertions(14);
      const wrapper = mountComponent(Component);

      await new Promise((resolve) => setTimeout(resolve, 1100));
      wrapper.update();
      const { waiter } = getWaiterProps(wrapper);

      expect(waiter.response).toBe(MOCK_RESULT);
      expect(waiter.error).toBe(null);

      expect(waiter.isPending).toBe(false);
      expect(waiter.isCompleted).toBe(true);
      expect(waiter.isResolved).toBe(true);
      expect(waiter.isRejected).toBe(false);
      expect(waiter.isCanceled).toBe(false);
      expect(waiter.isRefreshing).toBe(false);
      expect(waiter.isRetrying).toBe(false);

      expect(typeof waiter.startTime).toBe('number');
      expect(typeof waiter.lastModified).toBe('number');
      expect(typeof waiter.endTime).toBe('number');
      expect(typeof waiter.elapsedTime).toBe('number');
      expect(waiter.startTime < waiter.endTime).toBe(true);
    });
  });

  describe('should reject waiter view', () => {
    const MOCK_ERROR = {
      message: 'ERROR MESSAGE',
    };

    const Component = connectWaiter({
      name: 'rejectedWaiter',
      requestCreator: () =>
        new Promise((resolve, reject) => {
          setTimeout(() => reject(MOCK_ERROR), 1500);
        }),
      requestOnMount: true,
    })(() => <div>Hello</div>);

    it('Should render with pending state', async () => {
      expect.assertions(13);
      const wrapper = mountComponent(Component);

      await new Promise((resolve) => setTimeout(resolve, 10));
      const { waiter } = getWaiterProps(wrapper);

      expect(waiter.response).toBe(null);
      expect(waiter.error).toBe(null);

      expect(waiter.isPending).toBe(true);
      expect(waiter.isCompleted).toBe(false);
      expect(waiter.isResolved).toBe(false);
      expect(waiter.isRejected).toBe(false);
      expect(waiter.isCanceled).toBe(false);
      expect(waiter.isRefreshing).toBe(false);
      expect(waiter.isRetrying).toBe(false);

      expect(typeof waiter.startTime).toBe('number');
      expect(typeof waiter.lastModified).toBe('number');
      expect(waiter.endTime).toBe(null);
      expect(waiter.elapsedTime).toBe(null);
    });

    it('Should render with rejected state', async () => {
      expect.assertions(14);
      const wrapper = mountComponent(Component);
      await new Promise((resolve) => setTimeout(resolve, 1600));
      wrapper.update();
      const { waiter } = getWaiterProps(wrapper);

      expect(waiter.response).toBe(null);
      expect(waiter.error).toBe(MOCK_ERROR);

      expect(waiter.isPending).toBe(false);
      expect(waiter.isCompleted).toBe(true);
      expect(waiter.isResolved).toBe(false);
      expect(waiter.isRejected).toBe(true);
      expect(waiter.isCanceled).toBe(false);
      expect(waiter.isRefreshing).toBe(false);
      expect(waiter.isRetrying).toBe(false);

      expect(typeof waiter.startTime).toBe('number');
      expect(typeof waiter.lastModified).toBe('number');
      expect(typeof waiter.endTime).toBe('number');
      expect(typeof waiter.elapsedTime).toBe('number');
      expect(waiter.startTime < waiter.endTime).toBe(true);
    });
  });

  describe('should handle destroy and return waiterModel', () => {
    const WAITER_NAME = 'destroyedWaiter';
    const MOCK_ERROR = {
      message: 'ERROR MESSAGE',
    };

    const Component = connectWaiter({
      name: WAITER_NAME,
      requestCreator: () =>
        new Promise((resolve, reject) => {
          setTimeout(() => reject(MOCK_ERROR), 1500);
        }),
      requestOnMount: true,
    })(() => <div>Hello</div>);

    it.only('Should not resolve or reject', async () => {
      expect.assertions(1);
      const wrapper = mountComponent(Component);
      await new Promise((resolve) => setTimeout(resolve, 500));

      store.dispatch(reduxWaiter.actions.destroyWaiter(WAITER_NAME));
      await new Promise((resolve) => setTimeout(resolve, 1000));

      wrapper.update();
      const { waiter } = getWaiterProps(wrapper);
      expect(waiter).toBe(waiterModel);
    });
  });

  describe('should catch error', () => {
    const MOCK_RESULT = {
      dones: true,
    };

    const ErrorComponent = () => <div>Hello</div>;
    const Component = connectWaiter({
      name: 'mywaiter',
      requestCreator: () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(MOCK_RESULT), 1000);
        }),
      requestOnMountParams: () => MOCK_RESULT,
    })(ErrorComponent);

    it('Should not reject request with connectWaiter inner component error', async () => {
      expect.assertions(14);
      const wrapper = mountComponent(Component);

      // component should be stable when an error is thrown inside
      const error = new Error('test');
      wrapper.find('ErrorComponent').simulateError(error);

      await new Promise((resolve) => setTimeout(resolve, 1600));
      wrapper.update();

      const { waiter } = getWaiterProps(wrapper);

      expect(waiter.response).toBe(MOCK_RESULT);
      expect(waiter.error).toBe(null);

      expect(waiter.isPending).toBe(false);
      expect(waiter.isCompleted).toBe(true);
      expect(waiter.isResolved).toBe(true);
      expect(waiter.isRejected).toBe(false);
      expect(waiter.isCanceled).toBe(false);
      expect(waiter.isRefreshing).toBe(false);
      expect(waiter.isRetrying).toBe(false);

      expect(typeof waiter.startTime).toBe('number');
      expect(typeof waiter.lastModified).toBe('number');
      expect(typeof waiter.endTime).toBe('number');
      expect(typeof waiter.elapsedTime).toBe('number');
      expect(waiter.startTime < waiter.endTime).toBe(true);
    });
  });
});
