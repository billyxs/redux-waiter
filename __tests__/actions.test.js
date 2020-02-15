import reduxWaiter from '../src';
import REDUX_MOUNT_POINT from './redux-mount-point';

const { actions, actionTypes } = reduxWaiter;

const TEST_NAME = 'testName';
const ACTION_TYPE_PREFIX = `@${REDUX_MOUNT_POINT}/`;

describe('(Redux Waiter) Actions', () => {
  describe('(Actions) request lifecycle', () => {
    describe('(Action) callWaiter', () => {
      it('Should be exported as a function.', () => {
        expect(typeof actions.callWaiter).toBe('function');
      });
    });

    describe('(Action) waiterResponseHandler', () => {
      it('Should be exported as a function.', () => {
        expect(typeof actions.waiterResponseHandler).toBe('function');
      });
    });

    describe('(Action) initRequest', () => {
      it('Should be exported as a function.', () => {
        expect(typeof actions.initRequest).toBe('function');
      });

      it(`Should return an action with a namespaced type of '${ACTION_TYPE_PREFIX}INIT'.`, () => {
        expect(actions.initRequest(TEST_NAME)).toHaveProperty(
          'type',
          actionTypes.INIT
        );
      });
    });

    describe('(Action) clearWaiter', () => {
      it('Should be exported as a function.', () => {
        expect(typeof actions.clearWaiter).toBe('function');
      });

      it(`Should return an action with a namespaced type of '${ACTION_TYPE_PREFIX}CLEAR'.`, () => {
        expect(actions.clearWaiter(TEST_NAME)).toHaveProperty(
          'type',
          actionTypes.CLEAR
        );
      });
    });

    describe('(Action) destroyWaiter', () => {
      it('Should be exported as a function.', () => {
        expect(typeof actions.destroyWaiter).toBe('function');
      });

      it(`Should return an action with a namespaced type of '${ACTION_TYPE_PREFIX}DESTROY'.`, () => {
        expect(actions.destroyWaiter(TEST_NAME)).toHaveProperty(
          'type',
          actionTypes.DESTROY
        );
      });
    });

    describe('(Action) cancelRequest', () => {
      it('Should be exported as a function.', () => {
        expect(typeof actions.cancelRequest).toBe('function');
      });

      it(`Should return an action with a namespaced type of '${ACTION_TYPE_PREFIX}CANCEL'.`, () => {
        expect(actions.cancelRequest(TEST_NAME)).toHaveProperty(
          'type',
          actionTypes.CANCEL
        );
      });
    });

    describe('(Action) resolveRequest', () => {
      it('Should be exported as a function.', () => {
        expect(typeof actions.resolveRequest).toBe('function');
      });

      it(`Should return an action with a namespaced type of '${ACTION_TYPE_PREFIX}RESOLVE'.`, () => {
        expect(actions.resolveRequest(TEST_NAME)).toHaveProperty(
          'type',
          actionTypes.RESOLVE
        );
      });
    });

    describe('(Action) rejectRequest', () => {
      it('Should be exported as a function.', () => {
        expect(typeof actions.rejectRequest).toBe('function');
      });

      it(`Should return an action with a namespaced type of '${ACTION_TYPE_PREFIX}REJECT'.`, () => {
        expect(actions.rejectRequest(TEST_NAME)).toHaveProperty(
          'type',
          actionTypes.REJECT
        );
      });
    });
  });
});
