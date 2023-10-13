import Node from '../NodeHOC'
import css from '../Node.less'
import { PinSide } from '../../../../registers/NodeTypes'

function Entry (props) {
  const { node, outputPin } = props

  return (
    <div className={css.selectWrapper}>
      <div className={css.node}>
        <div className={`${css.header} ${css.entry}`}>Entry</div>
        <div className={css.sockets}>
          <div className={css.right}>
            {node.pins.filter((p) => p.side === PinSide.Out).map((pin) => outputPin(pin))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Node(Entry)
