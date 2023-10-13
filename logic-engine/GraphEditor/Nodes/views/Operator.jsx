import cs from 'classnames'
import Node from '../NodeHOC'
import css from '../Node.less'
import { PinSide } from '../../../../registers/NodeTypes'

function Operator (props) {
  const {
    node, inputPin, outputPin, addPin,
  } = props
  const { dataType, defaultValue } = node.pins.find((p) => p.side === PinSide.In)

  return (
    <div className={css.selectWrapper}>
      <div className={cs(css.node, css.operator)}>
        <div className={css.operatorName}>{node.nodeTitle}</div>
        <div className={css.sockets}>
          <div className={css.left}>
            {node.pins.filter((p) => p.side === PinSide.In).map((pin) => inputPin(pin))}
            {node.canAddInputs && (
            <div className={css.addPin} onClick={() => addPin({ dataType, defaultValue })}>
              <span className={css.addIcon}>+</span>
              {' '}
              Add pin
            </div>
            )}
          </div>
          <div className={css.right}>
            {node.pins.filter((p) => p.side === PinSide.Out).map((pin) => outputPin(pin))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Node(Operator)
