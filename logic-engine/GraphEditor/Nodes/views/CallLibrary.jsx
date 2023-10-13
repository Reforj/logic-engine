import cs from 'classnames'
import Node from '../NodeHOC'
import css from '../Node.less'
import { PinSide } from '../../../../registers/NodeTypes'

function CallLibrary (props) {
  const { node, inputPin, outputPin } = props
  return (
    <div className={css.selectWrapper}>
      <div className={cs(css.node)}>
        <div className={cs(css.header, { [css.pure]: node.pure })}>{node.title}</div>
        <div className={css.sockets}>
          <div className={css.left}>
            {node.pins.filter((p) => p.side === PinSide.In).map((pin) => inputPin(pin))}
          </div>
          <div className={css.right}>
            {node.pins.filter((p) => p.side === PinSide.Out).map((pin) => outputPin(pin))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Node(CallLibrary)
