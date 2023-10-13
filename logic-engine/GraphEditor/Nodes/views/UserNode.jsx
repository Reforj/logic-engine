import cs from 'classnames'
import Node from '../NodeHOC'
import css from '../Node.less'
import { PinSide } from '../../../../registers/NodeTypes'

function UserNode (props) {
  const {
    node, inputPin, outputPin, userNodesRegister, nodeInfo, change,
    disconnectPin, disconnectAllPins, changePin, createPin,
  } = props
  const Component = userNodesRegister.getView(node.name)

  const sockets = (
    <div className={css.sockets}>
      <div className={css.left}>
        {node.pins.filter((p) => p.side === PinSide.In).map((pin) => inputPin(pin))}
      </div>
      <div className={css.right}>
        {node.pins.filter((p) => p.side === PinSide.Out).map((pin) => outputPin(pin))}
      </div>
    </div>
  )

  return (
    <div className={css.selectWrapper}>
      <div className={cs(css.node, css.customNode)}>
        <div className={cs(css.header, css.userNode)}>
          <div className={css.name}>{nodeInfo.title}</div>
        </div>
        {Component
          ? (
            <Component
              node={node}
              inputPins={node.pins.filter((p) => p.side === PinSide.In)}
              outputPins={node.pins.filter((p) => p.side === PinSide.Out)}
              renderInputPin={inputPin}
              renderOutputPin={outputPin}
              sockets={sockets}
              disconnectPin={disconnectPin}
              disconnectAllPins={disconnectAllPins}
              changePin={changePin}
              createPin={createPin}
              change={change}
            />
          )
          : sockets}
      </div>
    </div>
  )
}

export default Node(UserNode)
