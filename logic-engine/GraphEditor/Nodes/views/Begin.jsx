import React, {useEffect} from 'react'
import Node from '../NodeHOC'
import css from '../Node.less'
import _ from 'lodash'


const Begin = (props) => {
  const { func, node, outputPin } = props

  return <div className={css.selectWrapper}>
    <div className={css.node}>
      <div className={`${css.header} ${css.entry}`}>Begin</div>
      <div className={css.sockets}>
        <div className={css.right}>
          {_.filter(node.pins, {side: 'Out'}).map((pin) => {
              return outputPin(pin)
          })}
        </div>
      </div>
    </div>
  </div>
}


export default Node(Begin)
