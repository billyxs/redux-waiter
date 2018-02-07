import reduxWaiter from '../src'

const {
  constants,
} = reduxWaiter

const REDUX_MOUNT_POINT = 'waiter'

describe('(Redux Waiter) Constants', function () {
  describe('(Constants)', function() {
    it(`Should export a constant NAME to equal ${REDUX_MOUNT_POINT}`, function () {
      expect(constants.NAME).to.equal(REDUX_MOUNT_POINT)
    })
  })
})

