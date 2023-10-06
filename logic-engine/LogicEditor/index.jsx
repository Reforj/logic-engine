import React from 'react'
import css from './LogicEditor.less'
import GraphEditor from '../GraphEditor'
import connect from './connect'

function LogicEditor(props) {
  return (
    <div className={css.editor}>
      <div className={css.content}>
        <GraphEditor {...props} />
      </div>
    </div>
  )
}

export default connect(LogicEditor)
