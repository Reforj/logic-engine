import cs from 'classnames'
import _ from 'lodash'
import Node from '../NodeHOC'
import css from '../Node.less'

function Operator (props) {
  const {
    node, inputPin, outputPin, addPin,
  } = props
  const { dataType, defaultValue } = _.find(node.pins, { side: 'In' })

  return (
    <div className={css.selectWrapper}>
      <div className={cs(css.node, css.operator)}>
        <div className={css.operatorName}>{node.nodeTitle}</div>
        <div className={css.sockets}>
          <div className={css.left}>
            {_.filter(node.pins, { side: 'In' }).map((pin) => inputPin(pin))}
            {node.canAddInputs && (
            <div className={css.addPin} onClick={() => addPin({ dataType, defaultValue })}>
              <span className={css.addIcon}>+</span>
              {' '}
              Add pin
            </div>
            )}
          </div>
          <div className={css.right}>
            {_.filter(node.pins, { side: 'Out' }).map((pin) => outputPin(pin))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Node(Operator)
