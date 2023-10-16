import cs from 'classnames'
import Node, { inputs, outputs } from '../NodeHOC'
import css from '../Node.less'

function CallLibrary (props) {
  const {
    node, renderPin, nodeInfo,
  } = props

  return (
    <div className={css.selectWrapper}>
      <div className={cs(css.node)}>
        <div className={cs(css.header, { [css.pure]: node.pure })}>{nodeInfo.nodeTitle}</div>
        <div className={css.sockets}>
          <div className={css.left}>
            {inputs(node.pins).map((pin) => renderPin(pin))}
          </div>
          <div className={css.right}>
            {outputs(node.pins).map((pin) => renderPin(pin))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Node(CallLibrary)
