import reduxWaiter from '../src';
import reducer from '../src/waiter-reducer';

const { actions } = reduxWaiter;

const TEST_NAME = 'testName';
const REQUEST_PAYLOAD = [
  {
    IssuerName: 'Plan 1',
    PlanType: 'HMO',
    PlanPremium: 135,
  },
  {
    IssuerName: 'Plan 2',
    PlanType: 'HMO',
    PlanPremium: 170,
  },
  {
    IssuerName: 'Plan 3',
    PlanType: 'PPO',
    PlanPremium: 161,
  },
];

const REQUEST_ERROR = {
  status: 403,
  statusText: 'Error: Model submission failed',
};

describe('(Redux Waiter)', () => {
  describe('(Reducer)', () => {
    it('Should be exported as a function.', () => {
      expect(typeof reducer).toBe('function');
    });
  });

  describe('(Model) initialState', () => {
    const state = reducer(undefined, {});

    it('Should hold initial state.', () => {
      expect(state.name).toBe(null);
      expect(state.response).toBe(null);
      expect(state.error).toBe(null);
      expect(state.isPending).toBe(false);
      expect(state.isResolved).toBe(false);
      expect(state.isRejected).toBe(false);
      expect(state.isCompleted).toBe(false);
      expect(state.isCanceled).toBe(false);
      expect(state.lastModified).toBe(null);
      expect(state.startTime).toBe(null);
      expect(state.endTime).toBe(null);
      expect(state.elapsedTime).toBe(null);
    });
  });

  describe('(Action) initRequest', () => {
    let state = reducer(undefined, {});
    state = reducer(state, actions.initRequest(TEST_NAME));

    it(`Should change state name from empty to ${TEST_NAME}.`, () => {
      expect(state.name).toBe(TEST_NAME);
    });

    it('Should update timestamps - startTime, lastModified', () => {
      expect(typeof state.lastModified).toBe('number');
      expect(typeof state.startTime).toBe('number');
      expect(state.endTime).toBe(null);
      expect(state.elapsedTime).toBe(null);
    });

    it('Should change state isPending from false to true.', () => {
      expect(state.isPending).toBe(true);
    });

    it('Should keep state properties response, error, isResolved, isRejected, isCompleted.', () => {
      expect(state.response).toBe(null);
      expect(state.error).toBe(null);
      expect(state.isResolved).toBe(false);
      expect(state.isRejected).toBe(false);
      expect(state.isCompleted).toBe(false);
    });
  });

  describe('(Action) resolveRequest', () => {
    let state = reducer(undefined, {});
    state = reducer(state, actions.resolveRequest(TEST_NAME, REQUEST_PAYLOAD));

    it('Should change state isResolved from false to true.', () => {
      expect(state.isResolved).toBe(true);
    });

    it('Should change state response from null to an array.', () => {
      expect(state.response).toBe(REQUEST_PAYLOAD);
    });

    it('Should update timestamps - endTime, elapsedTime, lastModified', () => {
      expect(state.startTime).toBe(null);
      expect(typeof state.lastModified).toBe('number');
      expect(typeof state.endTime).toBe('number');
      expect(typeof state.elapsedTime).toBe('number');
    });

    it('Should keep state - error, isPending, isRejected, isCompleted.', () => {
      expect(state.error).toBe(null);
      expect(state.isPending).toBe(false);
      expect(state.isRejected).toBe(false);
      expect(state.isCompleted).toBe(true);
    });
  });

  describe('(Action) rejectRequest', () => {
    let state = reducer(undefined, {});
    const rejectAction = actions.rejectRequest(TEST_NAME, REQUEST_ERROR);
    state = reducer(state, rejectAction);

    it('Should change state isRejected from false to true.', () => {
      expect(state.isRejected).toBe(true);
    });

    it('Should change state error from null to an error object.', () => {
      // expect(state.error).to.have.property('statusText', REQUEST_ERROR.statusText)
    });

    it('Should update timestamps - endTime, elapsedTime, lastModified', () => {
      expect(state.startTime).toBe(null);
      expect(typeof state.lastModified).toBe('number');
      expect(typeof state.endTime).toBe('number');
      expect(typeof state.elapsedTime).toBe('number');
    });

    it('Should keep state - response, isPending, isResolved, isCompleted.', () => {
      expect(state.response).toBe(null);
      expect(state.isPending).toBe(false);
      expect(state.isResolved).toBe(false);
      expect(state.isCompleted).toBe(true);
    });
  });

  describe('(Action) clearWaiter', () => {
    const beginState = reducer(undefined, {});
    const initState = reducer(beginState, actions.initRequest(TEST_NAME));

    it(`Should change state name from empty to ${TEST_NAME}.`, () => {
      expect(initState.name).toBe(TEST_NAME);
      expect(typeof initState.lastModified).toBe('number');
      expect(initState.isPending).toBe(true);
    });

    const clearState = reducer(initState, actions.clearWaiter(TEST_NAME));

    it('should set keep waiter name and lastModified timestamp', () => {
      expect(clearState.name).toBe(TEST_NAME);
      expect(typeof clearState.lastModified).toBe('number');
    });

    it('should set rest of waiter to initial state', () => {
      expect(clearState.response).toBe(null);
      expect(clearState.error).toBe(null);
      expect(clearState.isPending).toBe(false);
      expect(clearState.isResolved).toBe(false);
      expect(clearState.isRejected).toBe(false);
      expect(clearState.isCompleted).toBe(false);
      expect(clearState.isCanceled).toBe(false);
      expect(clearState.startTime).toBe(null);
      expect(clearState.endTime).toBe(null);
      expect(clearState.elapsedTime).toBe(null);
    });
  });
});
