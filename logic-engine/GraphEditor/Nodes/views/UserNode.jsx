import cs from 'classnames'
import Node, { inputs, outputs } from '../NodeHOC'
import css from '../Node.less'

function UserNode (props) {
  const {
    node, renderPin, userNodesRegister, nodeInfo, change,
    disconnectPin, disconnectAllPins, changePin, createPin,
  } = props
  const Component = userNodesRegister.getView(node.name)

  const pins = (
    <div className={cs(css.pins, nodeInfo.pinsClassName)}>
      <div className={css.left}>
        {inputs(node.pins).map((pin) => renderPin(pin))}
      </div>
      <div className={css.right}>
        {outputs(node.pins).map((pin) => renderPin(pin))}
      </div>
    </div>
  )

  return (
    <div className={css.selectWrapper}>
      <div className={cs(css.node, css.customNode, nodeInfo.nodeClassName)}>
        <div className={cs(css.header, css.userNode, nodeInfo.headerClassName)}>
          <div className={css.name}>{nodeInfo.title}</div>
        </div>
        {Component
          ? (
            <Component
              node={node}
              inputPins={inputs(node.pins)}
              outputPins={outputs(node.pins)}
              renderPin={renderPin}
              pins={pins}
              disconnectPin={disconnectPin}
              disconnectAllPins={disconnectAllPins}
              changePin={changePin}
              createPin={createPin}
              change={change}
            />
          )
          : pins}
      </div>
    </div>
  )
}

export default Node(UserNode)
