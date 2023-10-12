type DataType = 'boolean' | 'string' | 'number' | 'object' | 'any'
interface PinEtc {
  name?: string
  defaultValue?: any
}

interface Pin {
  dataType: DataType
  defaultValue?: any
  name?: string
}

const defaultValues = {
  boolean: false,
  number: 0,
  string: '',
  object: {},
  any: undefined,
}

const input = (dataType: DataType, etc: PinEtc = {}):Pin => ({
  dataType,
  defaultValue: etc.defaultValue || defaultValues[dataType],
  ...etc,
})
const output = (dataType: DataType, etc: PinEtc = {}):Pin => ({ dataType, ...etc })

type NodeType = 'Operator' | 'CallLibrary' | 'Return' | 'Branch'

interface NodeEtc {
  nodeTitle?: string
  path?: string
  pure?: boolean
  inputs?: Pin[]
  outputs?: Pin[]
  canAddInputs?: boolean
}

const node = (key: string, title: string, type: NodeType, etc: NodeEtc = {}) => ({
  key, title, type, ...etc,
})

export default [
  {
    title: 'Logic',
    key: 'logic',
    category: true,
    children: [
      node('Logic.Not', 'Not (!)', 'Operator', {
        nodeTitle: 'NOT',
        path: 'Logic.Not',
        pure: true,
        inputs: [input('boolean')],
        outputs: [output('boolean')],
      }),
      node('Logic.And', 'And (&&)', 'Operator', {
        nodeTitle: 'AND',
        path: 'Logic.And',
        pure: true,
        inputs: [input('boolean'), input('boolean')],
        outputs: [output('boolean')],
        canAddInputs: true,
      }),
      node('Logic.Or', 'Or (||)', 'Operator', {
        nodeTitle: 'OR',
        path: 'Logic.Or',
        pure: true,
        inputs: [input('boolean'), input('boolean')],
        outputs: [output('boolean')],
        canAddInputs: true,
      }),
      node('Logic.EqualBool', 'Equal (boolean === boolean)', 'Operator', {
        nodeTitle: 'EQUAL',
        path: 'Logic.Equal',
        pure: true,
        inputs: [input('boolean'), input('boolean')],
        outputs: [output('boolean')],
      }),
      node('Logic.NotEqualBool', 'Not Equal (boolean !== boolean)', 'Operator', {
        nodeTitle: 'NOT EQUAL',
        path: 'Logic.NotEqual',
        pure: true,
        inputs: [input('boolean'), input('boolean')],
        outputs: [output('boolean')],
      }),
      node('Logic.EqualNumber', 'Equal (number === number)', 'Operator', {
        nodeTitle: 'EQUAL',
        path: 'Logic.Equal',
        pure: true,
        inputs: [input('number'), input('number')],
        outputs: [output('boolean')],
      }),
      node('Logic.NotEqualNumber', 'Not Equal (number !== number)', 'Operator', {
        nodeTitle: 'NOT EQUAL',
        path: 'Logic.NotEqual',
        pure: true,
        inputs: [input('number'), input('number')],
        outputs: [output('boolean')],
      }),
      node('Logic.EqualString', 'Equal (string === string)', 'Operator', {
        nodeTitle: 'EQUAL',
        path: 'Logic.Equal',
        pure: true,
        inputs: [input('string'), input('string')],
        outputs: [output('boolean')],
      }),
      node('Logic.NotEqualString', 'Not Equal (string !== string)', 'Operator', {
        nodeTitle: 'NOT EQUAL',
        path: 'Logic.NotEqual',
        pure: true,
        inputs: [input('string'), input('string')],
        outputs: [output('boolean')],
      }),
      node('Logic.Greater', 'Greater (>)', 'Operator', {
        nodeTitle: '>',
        path: 'Logic.Greater',
        pure: true,
        inputs: [input('number'), input('number')],
        outputs: [output('boolean')],
      }),
      node('Logic.Less', 'Less (<)', 'Operator', {
        nodeTitle: '<',
        path: 'Logic.Less',
        pure: true,
        inputs: [input('number'), input('number')],
        outputs: [output('boolean')],
      }),
      node('Logic.GreaterEqual', 'GreaterEqual (>=)', 'Operator', {
        nodeTitle: '>=',
        path: 'Logic.GreaterEqual',
        pure: true,
        inputs: [input('number'), input('number')],
        outputs: [output('boolean')],
      }),
      node('Logic.LessEqual', 'LessEqual (<=)', 'Operator', {
        nodeTitle: '<=',
        path: 'Logic.LessEqual',
        pure: true,
        inputs: [input('number'), input('number')],
        outputs: [output('boolean')],
      }),
    ],
  },
  {
    title: 'Operator',
    key: 'operators',
    category: true,
    children: [
      node('Operator.Plus', 'Number + Number(Plus)', 'Operator', {
        nodeTitle: '+',
        path: 'Operator.Plus',
        pure: true,
        inputs: [input('number'), input('number')],
        outputs: [output('number')],
      }),
      node('Operator.PlusString', 'String + String(concan)', 'Operator', {
        nodeTitle: '+',
        path: 'Operator.Plus',
        pure: true,
        inputs: [input('string'), input('string')],
        outputs: [output('string')],
      }),
    ],
  },
  {
    title: 'Debug',
    key: 'debugs',
    category: true,
    children: [
      node('Debug.Log', 'Console.Log', 'CallLibrary', {
        path: 'Debug.Log', pure: false, inputs: [input('any')],
      }),
    ],
  },
  {
    title: 'Flow',
    key: 'flow',
    category: true,
    children: [
      node('Branch', 'Branch', 'Branch'),
    ],
  },
  node('ReturnNode', 'Return Node', 'Return'),
]
