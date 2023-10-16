import { RemovePinnedOfPin } from "../../../logic-engine/GraphEditor/commands/RemovePinnedOfPin"


describe('RemovePinnedOfPin', function () {
  const nodes = {
    'entry': {
      uuid: 'entry',
      type: 'Entry',
      execOutputs: [{uuid: 'entry_out'}],
      pins: [{
        type: 1,
        uuid: 'entry_out',
        pinned: {
          node: 'return',
          pin: 'exec_in'
        },
      },
      {
        uuid: 'arg_pin',
        name: 'input',
        type: 3,
        pinned: [{
          node: 'return',
          pin: 'result_pin'
        },{
          node: 'return',
          pin: 'result_pin2'
        }]
      },
      {
        uuid: 'arg_pin2',
        type: 3,
        name: 'input2',
        pinned: [{
          node: 'return',
          pin: 'result_pin'
        }]
      }]
    },
    'return': {
      uuid: 'return',
      type: 'Return',
      pins: [{
        type: 0,
        uuid: 'exec_in',
        pinned: {
          node: 'entry',
          pin: 'entry_out'
        }
      },
      {
        uuid: 'result_pin',
        type: 2,
        outputUuid: 'out1',
        pinned: {
          node: 'entry',
          pin: 'arg_pin'
        }
      },
      {
        uuid: 'result_pin2',
        type: 2,
        outputUuid: 'out2',
        pinned: {
          node: 'entry',
          pin: 'arg_pin'
        }
      }]
    }
  }

  it('should remove pin from pinned array', () => {
    const newNode = RemovePinnedOfPin(nodes.entry, nodes.return.pins[1])

    expect(newNode.pins[1].pinned).toStrictEqual([{"node": "return", "pin": "result_pin2"}])
    const newNode2 = RemovePinnedOfPin(newNode, nodes.return.pins[2])
    expect(newNode2.pins[1].pinned).toStrictEqual(null)
  })

  it('should remove pin from pinned', () => {
    const newNode = RemovePinnedOfPin(nodes.entry, nodes.return.pins[0])
    expect(newNode.pins[0].pinned).toStrictEqual(null)
  })

  it('should ignore unpinned pin', () => {
    const newNode = RemovePinnedOfPin(nodes.entry, {pinned: {}})
    expect(newNode.pins[2].pinned).toStrictEqual(nodes.entry.pins[2].pinned)
  })

  it('should ignore empty pin', () => {
    const newNode = RemovePinnedOfPin(nodes.entry, null)
    expect(newNode.pins[2].pinned).toStrictEqual(nodes.entry.pins[2].pinned)
  })

})
