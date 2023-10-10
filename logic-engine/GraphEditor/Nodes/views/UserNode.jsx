import React from 'react'
import Node from '../NodeHOC'
import css from '../Node.less'
import cs from 'classnames'
import _ from 'lodash'

const UserNode = (props) => {
  const {node, inputPin, outputPin, userNodesRegister,
    disconnectPin, disconnectAllPins, changePins, createPin, changeData,
  } = props
  const Component = userNodesRegister.getView(node.name)

  const sockets = <div className={css.sockets}>
    <div className={css.left}>
      {_.filter(node.pins, {side: 'In'}).map((pin) => {
        return inputPin(pin)
      })}
    </div>
    <div className={css.right}>
      {_.filter(node.pins, {side: 'Out'}).map((pin) => {
        return outputPin(pin)
      })}
    </div>
  </div>

  return <div className={css.selectWrapper}>
    <div className={cs(css.node, css.customNode)}>
      <div className={cs(css.header, css.userNode)}>
        <div className={css.name}>{node.title}</div>
      </div>
      {Component
        ? <Component
          node={node}
          inputPins={node.pins.filter(p => p.side === 'In')}
          outputPins={node.pins.filter(p => p.side === 'Out')}
          sockets={sockets}
          disconnectPin={disconnectPin}
          disconnectAllPins={disconnectAllPins}
          changePins={changePins}
          createPin={createPin}
          changeData={changeData}
         />
        : <div className={css.sockets}>
          <div className={css.left}>
            {_.filter(node.pins, {side: 'In'}).map((pin) => {
              return inputPin(pin)
            })}
          </div>
          <div className={css.right}>
            {_.filter(node.pins, {side: 'Out'}).map((pin) => {
              return outputPin(pin)
            })}
          </div>
        </div>
      }
    </div>
  </div>
}


export default Node(UserNode)
