import reduxWaiter, {
  getWaiter,
  getWaiterResponse,
  getWaiterError,
  callWaiter,
  clearWaiter,
  prepareWaiter,
  destroyWaiter,
} from '../src'

const {
  reducer,
} = reduxWaiter

describe('(Redux Waiter)', () => {
  describe('(Reducer)', () => {
    it('Should be exported as a function.', () => {
      expect(reducer).to.be.a('function')
    })
  })

  describe('(Export getWaiter action)', () => {
    it('Should be exported as a function.', () => {
      expect(getWaiter).to.be.a('function')
    })
  })

  describe('(Export getWaiterResponse action)', () => {
    it('Should be exported as a function.', () => {
      expect(getWaiterResponse).to.be.a('function')
    })
  })

  describe('(Export getWaiterError action)', () => {
    it('Should be exported as a function.', () => {
      expect(getWaiterError).to.be.a('function')
    })
  })

  describe('(Export callWaiter action)', () => {
    it('Should be exported as a function.', () => {
      expect(callWaiter).to.be.a('function')
    })
  })

  describe('(Export clearWaiter action)', () => {
    it('Should be exported as a function.', () => {
      expect(clearWaiter).to.be.a('function')
    })
  })

  describe('(Export prepareWaiter action)', () => {
    it('Should be exported as a function.', () => {
      expect(prepareWaiter).to.be.a('function')
    })
  })

  describe('(Export destroyWaiter action)', () => {
    it('Should be exported as a function.', () => {
      expect(destroyWaiter).to.be.a('function')
    })
  })
})
