import React, { useState, useEffect } from "react"
import { Provider } from 'react-redux'
import {LogicEngine} from './logic-engine'
import Header from './Header'
import css from './LogicEngine.less'
import _ from 'lodash'
import  store from './store'

export const getState = () => store.getState().engine

export default (props) => {
  useEffect(() => {
    store.dispatch({type: 'engine/INIT', ...props.data})
    return () => {
      store.dispatch({type: 'engine/RESET'})
    }
  }, [])

  return (
    <Provider store={store}>
      <div className={css.main}>
        <div className={css.editor}>
          <Header headerContent={props.headerContent} />
          <LogicEngine {...props}/>
        </div>
      </div>
    </Provider>
  )
}
