import reduxWaiter from '../src'
import REDUX_MOUNT_POINT from './redux-mount-point'

const {
  actions,
  actionTypes,
  constants,
  reducer,
  selectors
} = reduxWaiter

const TEST_NAME = 'testName'
const ACTION_TYPE_PREFIX = `@${REDUX_MOUNT_POINT}/`

describe('(Redux Waiter) Actions', function () {

  describe('(Actions) request lifecycle', function() {
    describe('(Action) callWaiter', function() {
      it('Should be exported as a function.', function () {
        expect(actions.callWaiter).to.be.a('function')
      })
    })

    describe('(Action) initRequest', function() {
      it('Should be exported as a function.', function () {
        expect(actions.initRequest).to.be.a('function')
      })

      it(`Should return an action with a namespaced type of '${ACTION_TYPE_PREFIX}INIT'.`, function () {
        expect(actions.initRequest(TEST_NAME)).to.have.property('type', actionTypes.INIT)
      })
    })

    describe('(Action) resolveRequest', function() {
      it('Should be exported as a function.', function () {
        expect(actions.resolveRequest).to.be.a('function')
      })

      it(`Should return an action with a namespaced type of '${ACTION_TYPE_PREFIX}RESOLVE'.`, function () {
        expect(actions.resolveRequest(TEST_NAME)).to.have.property('type', actionTypes.RESOLVE)
      })
    })

    describe('(Action) rejectRequest', function() {
      it('Should be exported as a function.', function () {
        expect(actions.rejectRequest).to.be.a('function')
      })

      it(`Should return an action with a namespaced type of '${ACTION_TYPE_PREFIX}REJECT'.`, function () {
        expect(actions.rejectRequest(TEST_NAME)).to.have.property('type', actionTypes.REJECT)
      })
    })
  })
})
