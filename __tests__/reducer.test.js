import reduxWaiter from '../src'
import reducer from '../src/reducer'
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
})
