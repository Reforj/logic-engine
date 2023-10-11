import BuildFunction from '../../../logic-engine/Runtime/commands/BuildFunction'

describe('Func with connection to return', function () {
  const data = {
    nodes: {
      'entry': {
        uuid: 'entry',
        type: 'Entry',
        pins: [{uuid: 'entry_out', exec: true, side: 'Out'}]
      },
      'return': {
        uuid: 'return',
        type: 'Return',
        pins: [{uuid: 'return_in', exec: true}]
      }
    },
    inputs: [],
    outputs: [],
  }

  const func = BuildFunction(data)

  it('should return empty', () => {
    expect(func({func: data})).toStrictEqual([])
  })
})
