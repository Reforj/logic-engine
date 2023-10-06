import React, {useEffect} from 'react'
import Node from '../NodeHOC'
import css from '../Node.less'
import _ from 'lodash'

const Return = (props) => {
  const { node, inputPin, outputPin, changeNode, disconnectPins } = props

  return <div className={css.selectWrapper}>
    <div className={css.node}>
      <div className={`${css.header} ${css.entry}`}>{node.type}</div>
      <div className={css.sockets}>
        <div className={css.left}>
          {_.filter(node.pins, {side: 'In'}).map((pin) => {
            return inputPin(pin)
          })}
        </div>
      </div>
    </div>
  </div>
}


export default Node(Return)
