import cs from 'classnames'
import Node, { inputs, outputs } from '../NodeHOC'
import css from '../Node.less'

function Operator (props) {
  const {
    node, renderPin, addPin, nodeInfo,
  } = props
  const { dataType, defaultValue } = inputs(node.pins)[0]

  return (
    <div className={css.selectWrapper}>
      <div className={cs(css.node, css.operator)}>
        <div className={css.operatorName}>{nodeInfo.nodeTitle}</div>
        <div className={css.sockets}>
          <div className={css.left}>
            {inputs(node.pins).map((pin) => renderPin(pin))}
            {nodeInfo.canAddInputs && (
            <div className={css.addPin} onClick={() => addPin({ dataType, defaultValue })}>
              <span className={css.addIcon}>+</span>
              {' '}
              Add pin
            </div>
            )}
          </div>
          <div className={css.right}>
            {outputs(node.pins).map((pin) => renderPin(pin))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Node(Operator)
