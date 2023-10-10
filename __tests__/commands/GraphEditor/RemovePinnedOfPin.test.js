import { RemovePinnedOfPin } from "../../../logic-engine/GraphEditor/commands/RemovePinnedOfPin";


describe('RemovePinnedOfPin', function () {
  const nodes = {
    'entry': {
      uuid: 'entry',
      type: 'Entry',
      execOutputs: [{uuid: 'entry_out'}],
      pins: [{
        side: "Out",
        type: 'Exec',
        uuid: 'entry_out',
        pinned: {
          node: 'return',
          socket: 'exec_in'
        },
      },
      {
        uuid: 'arg_pin',
        side: 'Out',
        type: 'Var',
        name: 'input',
        multiple: true,
        pinned: [{
          node: 'return',
          socket: 'result_pin'
        },{
          node: 'return',
          socket: 'result_pin2'
        }]
      },
      {
        uuid: 'arg_pin2',
        side: 'Out',
        type: 'Var',
        name: 'input2',
        multiple: true,
        pinned: [{
          node: 'return',
          socket: 'result_pin'
        }]
      }]
    },
    'return': {
      uuid: 'return',
      type: 'Return',
      pins: [{
        side: "In",
        type: 'Exec',
        uuid: 'exec_in',
        pinned: {
          node: 'entry',
          socket: 'entry_out'
        }
      },
      {
        uuid: 'result_pin',
        side: 'In',
        type: 'Var',
        outputUuid: 'out1',
        pinned: {
          node: 'entry',
          socket: 'arg_pin'
        }
      },
      {
        uuid: 'result_pin2',
        side: 'In',
        type: 'Var',
        outputUuid: 'out2',
        pinned: {
          node: 'entry',
          socket: 'arg_pin'
        }
      }]
    }
  }

  it('should remove pin from pinned array', () => {
    const newNode = RemovePinnedOfPin(nodes.entry, nodes.return.pins[1])

    expect(newNode.pins[1].pinned).toStrictEqual([{"node": "return", "socket": "result_pin2"}])
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

});
