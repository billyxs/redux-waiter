import reduxWaiter from '../src'
import reducer from '../src/waiter-reducer'

const {
  actions,
  actionTypes,
  selectors
} = reduxWaiter

const TEST_NAME = 'testName'
const REQUEST_PAYLOAD = [{
  IssuerName: 'Plan 1',
  PlanType: 'HMO',
  PlanPremium: 135
}, {
  IssuerName: 'Plan 2',
  PlanType: 'HMO',
  PlanPremium: 170
}, {
  IssuerName: 'Plan 3',
  PlanType: 'PPO',
  PlanPremium: 161
}]
const successRequest = () => Promise.resolve(REQUEST_PAYLOAD)

const REQUEST_ERROR = {
  status: 403,
  statusText: 'Error: Model submission failed'
}
const errorRequest = () => Promise.resolve(REQUEST_ERROR)

describe('(Redux Waiter)', function () {
  describe('(Reducer)', function() {
    it('Should be exported as a function.', function () {
      expect(reducer).to.be.a('function')
    })
  })

  describe('(Model) initialState', function() {
    let state = reducer(undefined, {})

    it('Should hold initial state.', function () {
      expect(state.name).to.be.null
      expect(state.response).to.be.null
      expect(state.error).to.be.null
      expect(state.isPending).to.be.false
      expect(state.isResolved).to.be.false
      expect(state.isRejected).to.be.false
      expect(state.isCompleted).to.be.false
      expect(state.isCanceled).to.be.false
    })
  })

  describe('(Action) initRequest', function() {
    let state = reducer(undefined, {})
    state = reducer(state, actions.initRequest(TEST_NAME))

    it(`Should change state name from empty to ${TEST_NAME}.`, function () {
      expect(state.name).to.equal(TEST_NAME)
    })

    it('Should change state isPending from false to true.', function () {
      expect(state.isPending).to.be.true
    })

    it('Should keep state properties response, error, isResolved, isRejected, isCompleted.', function () {
      expect(state.response).to.be.null
      expect(state.error).to.be.null
      expect(state.isResolved).to.be.false
      expect(state.isRejected).to.be.false
      expect(state.isCompleted).to.be.false
    })
  })

  describe('(Action) resolveRequest', function() {
    let state = reducer(undefined, {})
    state = reducer(state, actions.resolveRequest(TEST_NAME, REQUEST_PAYLOAD))

    it('Should change state isResolved from false to true.', function () {
      expect(state.isResolved).to.be.true
    })

    it('Should change state response from null to an array.', function () {
      expect(state.response).to.equal(REQUEST_PAYLOAD)
    })

    it('Should keep state - error, isPending, isRejected, isCompleted.', function () {
      expect(state.error).to.be.null
      expect(state.isPending).to.be.false
      expect(state.isRejected).to.be.false
      expect(state.isCompleted).to.be.true
    })
  })

  describe('(Action) rejectRequest', function() {
    let state = reducer(undefined, {})
    const rejectAction = actions.rejectRequest(TEST_NAME, REQUEST_ERROR)
    state = reducer(state, rejectAction)

    it('Should change state isRejected from false to true.', function () {
      expect(state.isRejected).to.be.true
    })

    it('Should change state error from null to an error object.', function () {
      expect(state.error).to.have.property('statusText', REQUEST_ERROR.statusText)
    })

    it('Should keep state - response, isPending, isResolved, isCompleted.', function () {
      expect(state.response).to.be.null
      expect(state.isPending).to.be.false
      expect(state.isResolved).to.be.false
      expect(state.isCompleted).to.be.true
    })
  })
})
