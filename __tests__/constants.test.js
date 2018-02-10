import reduxWaiter from '../src'

const {
  constants,
} = reduxWaiter

const REDUX_MOUNT_POINT = 'waiter'

describe('(Redux Waiter) Constants', () => {
  describe('(Constants)', () => {
    it(`Should export a constant NAME to equal ${REDUX_MOUNT_POINT}`, () => {
      expect(constants.NAME).toBe(REDUX_MOUNT_POINT)
    })
  })
})

