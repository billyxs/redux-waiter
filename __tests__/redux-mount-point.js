import { NAME } from '../src/constants'

export default NAME

// dummy test
describe('Redux mount point', () => {
  it('Should match NAME export in constants', () => {
    expect(NAME).toBe('waiter')
  })
})
