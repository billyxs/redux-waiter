import reducer from '../src/reducer'

describe('(Redux Waiter)', () => {
  describe('(Reducer)', () => {
    it('Should be exported as a function.', () => {
      expect(typeof reducer).toBe('function')
    })
  })
})
