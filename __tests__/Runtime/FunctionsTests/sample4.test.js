import BuildFunction from '../../../logic-engine/Runtime/commands/BuildFunction'
import data from './data/sample4.json'

describe('Func with && and NOT nodes', function () {
  const func = BuildFunction(data)

  it('should return passed arg', () => {
    expect(func({})).toStrictEqual([true])
  })
})
