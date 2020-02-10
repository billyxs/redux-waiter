import reduxWaiter from '../src'

const {
  actions,
  constants,
  // actionTypes,
} = reduxWaiter

const { NAME: REDUX_MOUNT_POINT } = constants

// const TEST_NAME = 'testName'
const ACTION_TYPE_PREFIX = `@${REDUX_MOUNT_POINT}/`

describe('(Redux Waiter) Actions', () => {
  describe('(Actions) request lifecycle', () => {
    describe('(Action) callWaiter', () => {
      it('Should be exported as a function.', () => {
        expect(typeof actions.callWaiter).toBe('function')
      })
    })

    describe('(Action) initRequest', () => {
      it('Should be exported as a function.', () => {
        expect(typeof actions.initRequest).toBe('function')
      })

      it(`Should return an action with a namespaced type of '${ACTION_TYPE_PREFIX}INIT'.`, () => {
        // expect(actions.initRequest(TEST_NAME)).to.have.property('type', actionTypes.INIT)
      })
    })

    describe('(Action) resolveRequest', () => {
      it('Should be exported as a function.', () => {
        expect(typeof actions.resolveRequest).toBe('function')
      })

      it(`Should return an action with a namespaced type of '${ACTION_TYPE_PREFIX}RESOLVE'.`, () => {
        // expect(actions.resolveRequest(TEST_NAME)).to.have.property('type', actionTypes.RESOLVE)
      })
    })

    describe('(Action) rejectRequest', () => {
      it('Should be exported as a function.', () => {
        expect(typeof actions.rejectRequest).toBe('function')
      })

      it(`Should return an action with a namespaced type of '${ACTION_TYPE_PREFIX}REJECT'.`, () => {
        // expect(actions.rejectRequest(TEST_NAME)).to.have.property('type', actionTypes.REJECT)
      })
    })
  })
})
