import _ from 'lodash'
import Node from '../NodeHOC'
import css from '../Node.less'

function Return (props) {
  const { node, inputPin } = props

  return (
    <div className={css.selectWrapper}>
      <div className={css.node}>
        <div className={`${css.header} ${css.entry}`}>{node.type}</div>
        <div className={css.sockets}>
          <div className={css.left}>
            {_.filter(node.pins, { side: 'In' }).map((pin) => inputPin(pin))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Node(Return)
