import Types from './NodeTypes'

export default [
  {
    title: 'Logic',
    key: 'logic',
    selectable: false,
    category: true,
    children: [
      {key: 'Logic.Not', title: '! (Not)', type: "Operator", nodeTitle: 'NOT', path: 'Logic.Not', pure: true,
        inputs: [{dataType: 'boolean', defaultValue: false}],
        outputs: [{dataType: 'boolean'}],
      },
      {key: 'Logic.And', title: '&& (And)', type: "Operator", nodeTitle: '&&', path: 'Logic.And', pure: true,
        inputs: [{dataType: 'boolean', defaultValue: false}, {dataType: 'boolean', defaultValue: false}],
        outputs: [{dataType: 'boolean'}],
        canAddInput: true
      },
      {key: 'Logic.Or', title: '|| (Or)', type: "Operator", nodeTitle: '||', path: 'Logic.Or', pure: true,
        inputs: [{dataType: 'boolean', defaultValue: false}, {dataType: 'boolean', defaultValue: false}],
        outputs: [{dataType: 'boolean'}],
        canAddInput: true
      },
      {key: 'Logic.Equal', title: '=== (Equal)', type: "Operator", nodeTitle: '===', path: 'Logic.Equal', pure: true,
        inputs: [{dataType: 'any', defaultValue: false}, {dataType: 'any', defaultValue: false}],
        outputs: [{dataType: 'boolean'}],
      },
      {key: 'Logic.NotEqual', title: '!== (NotEqual)', type: "Operator", nodeTitle: '!==', path: 'Logic.NotEqual', pure: true,
        inputs: [{dataType: 'any', defaultValue: false}, {dataType: 'any', defaultValue: false}],
        outputs: [{dataType: 'boolean'}],
      },
      {key: 'Logic.Greater', title: '> (Greater)', type: "Operator", nodeTitle: '>', path: 'Logic.Greater', pure: true,
        inputs: [{dataType: 'number', defaultValue: false}, {dataType: 'number', defaultValue: false}],
        outputs: [{dataType: 'boolean'}],
      },
      {key: 'Logic.Less', title: '< (Less)', type: "Operator", nodeTitle: '<', path: 'Logic.Less', pure: true,
        inputs: [{dataType: 'number', defaultValue: false}, {dataType: 'number', defaultValue: false}],
        outputs: [{dataType: 'boolean'}],
      },
      {key: 'Logic.GreaterEqual', title: '>= (GreaterEqual)', type: "Operator", nodeTitle: '>=', path: 'Logic.GreaterEqual', pure: true,
        inputs: [{dataType: 'number', defaultValue: false}, {dataType: 'number', defaultValue: false}],
        outputs: [{dataType: 'boolean'}],
      },
      {key: 'Logic.LessEqual', title: '<= (LessEqual)', type: "Operator", nodeTitle: '<=', path: 'Logic.LessEqual', pure: true,
        inputs: [{dataType: 'number', defaultValue: false}, {dataType: 'number', defaultValue: false}],
        outputs: [{dataType: 'boolean'}],
      },
    ]
  },
  {
    title: 'Operator',
    key: 'operators',
    selectable: false,
    category: true,
    children: [
      {key: 'Operator.Plus', title: 'Number + Number(Plus)', type: "Operator", nodeTitle: '+', path: 'Operator.Plus', pure: true,
        inputs: [{dataType: 'number', defaultValue: 0}, {dataType: 'number', defaultValue: 0}],
        outputs: [{dataType: 'number'}],
      },
      {key: 'Operator.PlusString', title: 'String + String(concan)', type: "Operator", nodeTitle: '+', path: 'Operator.Plus', pure: true,
        inputs: [{dataType: 'string', defaultValue: ''}, {dataType: 'string', defaultValue: ''}],
        outputs: [{dataType: 'string'}],
      },
      {key: 'Operator.Minus', title: 'Number - Number', type: "Operator", nodeTitle: '-', path: 'Operator.Minus', pure: true, inputs: 2, outputs: 1},
      {key: 'Operator.Multiple', title: 'Number * Number', type: "Operator", nodeTitle: '-', path: 'Operator.Multiple', pure: true, inputs: 2, outputs: 1},
      {key: 'Operator.Increment', title: 'Number ++', type: "Operator", nodeTitle: '++', path: 'Operator.Increment', pure: true, inputs: 1, outputs: 1},
      {key: 'Operator.Decrement', title: 'Number --', type: "Operator", nodeTitle: '--', path: 'Operator.Decrement', pure: true, inputs: 1, outputs: 1},
      {key: 'Operator.UnaryPlus', title: 'Unary +', type: "Operator", nodeTitle: '+', path: 'Operator.UnaryPlus', pure: true, inputs: 1, outputs: 1},
      {key: 'Operator.UnaryMinus', title: 'Unary -', type: "Operator", nodeTitle: '-', path: 'Operator.UnaryMinus', pure: true, inputs: 1, outputs: 1},
    ]
  },
  // {
  //   title: 'Utils',
  //   key: 'utils',
  //   selectable: false,
  //   category: true,
  //   children: [
  //     {
  //       title: 'Array',
  //       key: 'array',
  //       selectable: false,
  //       category: true,
  //       children: [
  //         {key: 'Array.Push', title: 'Array Push', type: "CallLibrary", path: 'Array.Push', inputs: [{name: '[]', type: 'Array'}, {name: 'item'}], outputs: [{name: 'index'}]},
  //         {key: 'Array.iPush', title: 'Array Push Immutable', type: "CallLibrary", path: 'Array.iPush', inputs: [{name: '[]', type: 'Array'}, {name: 'item'}], outputs: [{name: '[]', type: 'Array'}]},
  //         {key: 'Array.remove', title: 'Array Remove', type: "CallLibrary", path: 'Array.remove', inputs: [{name: '[]', type: 'Array'}, {name: 'item'}], outputs: [{name: '[]', type: 'Array'}]},
  //         {key: 'Array.iRemove', title: 'Array Remove Immutable', type: "CallLibrary", path: 'Array.iRemove', inputs: [{name: '[]', type: 'Array'}, {name: 'item'}], outputs: [{name: '[]', type: 'Array'}]},
  //         {key: 'Array.iRemoveAt', title: 'Array Remove At Immutable', type: "CallLibrary", path: 'Array.iRemoveAt', inputs: [{name: '[]', type: 'Array'}, {name: 'index'}], outputs: [{name: '[]', type: 'Array'}]},
  //         {key: 'Array.each', title: 'Array Each', type: "Iterator", nodeTitle: 'Each', iteratorType: 'each' ,inputs: [{name: '[]', type: 'Array'}, {name: 'callback', type: 'Single'}], outputs: [], iterator: {inputs: [{name: 'Item'}, {name: 'index'}], outputs: []}},
  //         {key: 'Array.map', title: 'Array map', type: "Iterator", nodeTitle: 'Map', iteratorType: 'map', inputs: [{name: '[]', type: 'Array'}, {name: 'callback', type: 'Single'}], outputs: [{name: '[]', type: 'Array'}], iterator: {inputs: [{name: 'Item'}, {name: 'index'}], outputs: [{name: 'Item'}]}},
  //       ]
  //     },
  //     {
  //       title: 'Object',
  //       key: 'object',
  //       selectable: false,
  //       category: true,
  //       children: [
  //       ]
  //     },
  //   ]
  // },

  {
    title: 'Debug',
    key: 'debugs',
    selectable: false,
    category: true,
    children: [
      {key: 'Debug.Log', title: 'Console.Log', type: "CallLibrary", path: 'Debug.Log', pure: false, inputs: [{}]},
    ]
  },
  {
    title: 'Flow',
    key: 'flow',
    selectable: false,
    category: true,
    children: [
      {key: 'Branch', title: 'Branch', type: "Branch" },
    ]
  },
  {
    key: 'ReturnNode',
    title: 'Return Node',
    type: 'Return'
  }
]
