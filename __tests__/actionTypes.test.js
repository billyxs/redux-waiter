import reduxWaiter from '../src'
const {
  actions,
  actionTypes,
  constants,
  reducer,
  selectors
} = reduxWaiter

const REDUX_MOUNT_POINT = 'waiter'
const TEST_NAME = 'testName'
const ACTION_TYPE_PREFIX = `@${REDUX_MOUNT_POINT}/`

describe('(Redux Waiter) ActionTypes', function () {
  describe('(ActionTypes)', function() {
    it('Should export a actionType INIT', function () {
      expect(actionTypes.INIT)
        .to.equal(ACTION_TYPE_PREFIX + constants.INIT)
    })

    it('Should export a actionType RESOLVE', function () {
      expect(actionTypes.RESOLVE)
        .to.equal(ACTION_TYPE_PREFIX + constants.RESOLVE)
    })

    it('Should export a actionType REJECT', function () {
      expect(actionTypes.REJECT)
        .to.equal(ACTION_TYPE_PREFIX + constants.REJECT)
    })

    it('Should export a actionType COMPLETE', function () {
      expect(actionTypes.COMPLETE)
        .to.equal(ACTION_TYPE_PREFIX + constants.COMPLETE)
    })
  })
})
