import _ from 'lodash'
import Node from '../NodeHOC'
import css from '../Node.less'

function Begin (props) {
  const { node, outputPin } = props

  return (
    <div className={css.selectWrapper}>
      <div className={css.node}>
        <div className={`${css.header} ${css.entry}`}>Begin</div>
        <div className={css.sockets}>
          <div className={css.right}>
            {_.filter(node.pins, { side: 'Out' }).map((pin) => outputPin(pin))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Node(Begin)
