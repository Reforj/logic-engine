import React from 'react'
import Node from '../NodeHOC'
import css from '../Node.less'
import cs from 'classnames'
import _ from 'lodash'

const Branch = (props) => {
  const {node, inputPin, outputPin} = props
  return <div className={css.selectWrapper}>
    <div className={cs(css.node, css.branch)}>
      <div className={cs(css.header, css.branch)}>Branch</div>
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


export default Node(Branch)
