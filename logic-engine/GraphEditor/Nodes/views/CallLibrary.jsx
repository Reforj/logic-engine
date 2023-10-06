import React from 'react'
import Node from '../NodeHOC'
import SocketInput from '../sockets/SocketInput'
import SocketOutput from '../sockets/SocketOutput'
import ExecInput from '../sockets/ExecInput'
import ExecOutput from '../sockets/ExecOutput'
import css from '../Node.less'
import cs from 'classnames'
import _ from 'lodash'

const CallLibrary = (props) => {
  const {node, inputPin, outputPin} = props
  return <div className={css.selectWrapper}>
    <div className={cs(css.node)}>
      <div className={cs(css.header, {[css.pure]: node.pure})}>{node.title}</div>
      <div className={css.sockets}>
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
    </div>
  </div>
}


export default Node(CallLibrary)
