import BuildFunction from '../../../logic-engine/Runtime/commands/BuildFunction'

describe('Empty Function', function () {
  const data = {
    nodes: {
      'entry1': {
        uuid: 'entry1',
        type: 'Entry',
        pins: [{
          uuid: 'exec_out',
          exec: true,
          side: 'Out'
        }]
      }
    },
    inputs: [],
    outputs: [],
  }

  const func = BuildFunction(data)

  it('should return empty array', () => {
    expect(func(data)).toStrictEqual([])
  })
})
