import { NAME } from '../src/constants'

export default NAME

describe('Redux mount point', () => {
  it('Should match NAME export in constants', () => {
    expect(NAME).toBe('waiter')
  })
})
