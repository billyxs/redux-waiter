import reduxWaiter from '../src';
import reducer from '../src/reducer';

const { actions } = reduxWaiter;

const TEST_NAME = 'testName';
const TEST_NAME_2 = 'testName2';

describe('(Redux Waiter)', () => {
  describe('(Reducer)', () => {
    it('Should be exported as a function.', () => {
      expect(typeof reducer).toBe('function');
    });
  });

  describe('(Action) destroyWaiter', () => {
    const beginState = reducer(undefined, {});
    const firstWaiterState = reducer(
      beginState,
      actions.initRequest(TEST_NAME)
    );

    it(`Should create one waiter named ${TEST_NAME}.`, () => {
      const firstWaiter = firstWaiterState[TEST_NAME];
      expect(firstWaiter.name).toBe(TEST_NAME);
    });

    const secondWaiterState = reducer(
      firstWaiterState,
      actions.initRequest(TEST_NAME_2)
    );

    it(`Should create second waiter named ${TEST_NAME_2}.`, () => {
      const secondWaiter = secondWaiterState[TEST_NAME_2];
      expect(secondWaiter.name).toBe(TEST_NAME_2);
    });

    const endState = reducer(
      secondWaiterState,
      actions.destroyWaiter(TEST_NAME)
    );

    it(`Should should remove waiter ${TEST_NAME}.`, () => {
      expect(endState[TEST_NAME]).toBeUndefined();
    });

    it(`Should should retain waiter ${TEST_NAME_2}.`, () => {
      const test2Waiter = endState[TEST_NAME_2];
      expect(test2Waiter.name).toBe(TEST_NAME_2);
    });
  });

  describe('(Action) destroyAll', () => {
    const beginState = reducer(undefined, {});
    const firstWaiterState = reducer(
      beginState,
      actions.initRequest(TEST_NAME)
    );

    it(`Should create one waiter named ${TEST_NAME}.`, () => {
      const firstWaiter = firstWaiterState[TEST_NAME];
      expect(firstWaiter.name).toBe(TEST_NAME);
    });

    const secondWaiterState = reducer(
      firstWaiterState,
      actions.initRequest(TEST_NAME_2)
    );

    it(`Should create second waiter named ${TEST_NAME_2}.`, () => {
      const secondWaiter = secondWaiterState[TEST_NAME_2];
      expect(secondWaiter.name).toBe(TEST_NAME_2);
    });

    const endState = reducer(secondWaiterState, actions.destroyAll());

    it(`Should should remove all waiters.`, () => {
      expect(endState[TEST_NAME]).toBeUndefined();
      expect(endState[TEST_NAME_2]).toBeUndefined();
    });
  });

  describe('(Action) clearAll', () => {
    const beginState = reducer(undefined, {});
    const firstWaiterState = reducer(
      beginState,
      actions.initRequest(TEST_NAME)
    );

    it(`Should create one waiter named ${TEST_NAME}.`, () => {
      const firstWaiter = firstWaiterState[TEST_NAME];
      expect(firstWaiter.name).toBe(TEST_NAME);
      expect(firstWaiter.isPending).toBe(true);
    });

    const secondWaiterState = reducer(
      firstWaiterState,
      actions.initRequest(TEST_NAME_2)
    );

    it(`Should create second waiter named ${TEST_NAME_2}.`, () => {
      const secondWaiter = secondWaiterState[TEST_NAME_2];
      expect(secondWaiter.name).toBe(TEST_NAME_2);
      expect(secondWaiter.isPending).toBe(true);
    });

    const endState = reducer(secondWaiterState, actions.clearAll());

    it(`Should should remove all waiters.`, () => {
      const firstWaiter = endState[TEST_NAME];
      expect(firstWaiter.name).toBe(TEST_NAME);
      expect(firstWaiter.isPending).toBe(false);

      const secondWaiter = endState[TEST_NAME_2];
      expect(secondWaiter.name).toBe(TEST_NAME_2);
      expect(secondWaiter.isPending).toBe(false);
    });
  });
});
