import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { LogicEngine } from '../logic-engine'
import Header from './Header'
import css from './LogicEngine.less'
import store from '../store'

export const getState = () => store.getState().engine

export default function (props) {
  const { useDndProvider = true, data, headerContent } = props
  useEffect(() => {
    store.dispatch({ type: 'engine/INIT', ...data })
    return () => {
      store.dispatch({ type: 'engine/RESET' })
    }
  }, [])

  const withDndProvider = (children) => (
    <DndProvider backend={HTML5Backend}>
      {children}
    </DndProvider>
  )

  const content = (
    <Provider store={store}>
      <div className={css.main}>
        <div className={css.editor}>
          <Header headerContent={headerContent} />
          <LogicEngine {...props} />
        </div>
      </div>
    </Provider>
  )

  return (
    useDndProvider ? withDndProvider(content) : content
  )
}
