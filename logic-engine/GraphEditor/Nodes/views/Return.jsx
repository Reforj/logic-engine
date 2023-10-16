import Node from '../NodeHOC'
import css from '../Node.less'

function Return (props) {
  const { node, renderPin } = props

  return (
    <div className={css.selectWrapper}>
      <div className={css.node}>
        <div className={`${css.header} ${css.entry}`}>Return</div>
        <div className={css.pins}>
          <div className={css.left}>
            {node.pins.map((pin) => renderPin(pin))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Node(Return)
