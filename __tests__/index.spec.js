import reduxWaiter, {
  reducer,
  getWaiter,
  getWaiterResponse,
  getWaiterError,
  callWaiter,
  clearWaiter,
  prepareWaiter,
  destroyWaiter,
} from '../src';

describe('(Redux Waiter)', () => {
  describe('(Reducer)', () => {
    it('Should be exported as a function.', () => {
      expect(typeof reduxWaiter.reducer).toBe('function');
    });
  });

  describe('(Reducer - named export)', () => {
    it('Should be a named export as a function.', () => {
      expect(typeof reducer).toBe('function');
    });
  });

  describe('(Export getWaiter action)', () => {
    it('Should be exported as a function.', () => {
      expect(typeof getWaiter).toBe('function');
    });
  });

  describe('(Export getWaiterResponse action)', () => {
    it('Should be exported as a function.', () => {
      expect(typeof getWaiterResponse).toBe('function');
    });
  });

  describe('(Export getWaiterError action)', () => {
    it('Should be exported as a function.', () => {
      expect(typeof getWaiterError).toBe('function');
    });
  });

  describe('(Export callWaiter action)', () => {
    it('Should be exported as a function.', () => {
      expect(typeof callWaiter).toBe('function');
    });
  });

  describe('(Export clearWaiter action)', () => {
    it('Should be exported as a function.', () => {
      expect(typeof clearWaiter).toBe('function');
    });
  });

  describe('(Export prepareWaiter action)', () => {
    it('Should be exported as a function.', () => {
      expect(typeof prepareWaiter).toBe('function');
    });
  });

  describe('(Export destroyWaiter action)', () => {
    it('Should be exported as a function.', () => {
      expect(typeof destroyWaiter).toBe('function');
    });
  });
});
