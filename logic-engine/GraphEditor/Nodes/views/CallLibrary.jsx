import cs from 'classnames'
import _ from 'lodash'
import Node from '../NodeHOC'
import css from '../Node.less'

function CallLibrary (props) {
  const { node, inputPin, outputPin } = props
  return (
    <div className={css.selectWrapper}>
      <div className={cs(css.node)}>
        <div className={cs(css.header, { [css.pure]: node.pure })}>{node.title}</div>
        <div className={css.sockets}>
          <div className={css.left}>
            {_.filter(node.pins, { side: 'In' }).map((pin) => inputPin(pin))}
          </div>
          <div className={css.right}>
            {_.filter(node.pins, { side: 'Out' }).map((pin) => outputPin(pin))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Node(CallLibrary)
