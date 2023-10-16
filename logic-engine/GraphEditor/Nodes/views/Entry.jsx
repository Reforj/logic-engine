import Node from '../NodeHOC'
import css from '../Node.less'

function Entry (props) {
  const { node, renderPin } = props

  return (
    <div className={css.selectWrapper}>
      <div className={css.node}>
        <div className={`${css.header} ${css.entry}`}>Entry</div>
        <div className={css.pins}>
          <div className={css.right}>
            {node.pins.map((pin) => renderPin(pin))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Node(Entry)
