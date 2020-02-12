import reduxWaiter from '../src';

const { actionTypes, constants } = reduxWaiter;

const REDUX_MOUNT_POINT = 'waiter';
const ACTION_TYPE_PREFIX = `@${REDUX_MOUNT_POINT}/`;

describe('(Redux Waiter) ActionTypes', () => {
  describe('(ActionTypes)', () => {
    it('Should export a actionType INIT', () => {
      expect(actionTypes.INIT).toBe(ACTION_TYPE_PREFIX + constants.INIT);
    });

    it('Should export a actionType RESOLVE', () => {
      expect(actionTypes.RESOLVE).toBe(ACTION_TYPE_PREFIX + constants.RESOLVE);
    });

    it('Should export a actionType REJECT', () => {
      expect(actionTypes.REJECT).toBe(ACTION_TYPE_PREFIX + constants.REJECT);
    });

    it('Should export a actionType COMPLETE', () => {
      expect(actionTypes.COMPLETE).toBe(
        ACTION_TYPE_PREFIX + constants.COMPLETE
      );
    });
  });
});
