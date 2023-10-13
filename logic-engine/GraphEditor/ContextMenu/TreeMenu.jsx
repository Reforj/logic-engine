import {
  Fragment, useState, useEffect, useRef,
} from 'react'
import css from './TreeMenu.less'

export function TreeMenu ({ treeData, onSelect }) {
  const [search, setSearch] = useState('')
  const ref = useRef()
  useEffect(() => {
    ref.current.focus()
  }, [])

  const searchedData = []

  if (search) {
    treeData.forEach((item) => {
      if (item.category) {
        let addCategory = false
        const children = []

        item.children.forEach((item) => {
          if (item.title.toLowerCase().includes(search)) {
            children.push(item)
            addCategory = true
          }
        })

        if (addCategory) {
          searchedData.push({ ...item, children })
        }
      } else if (item.title.toLowerCase().includes(search)) {
        searchedData.push(item)
      }
    })
  }

  const keyDown = (e) => {
    if (e.keyCode === 13 && searchedData.length) {
      onSelect(searchedData[0].category ? searchedData[0].children[0] : searchedData[0])
    }
  }

  return (
    <div className={css.menu}>
      <input
        onKeyDown={keyDown}
        ref={ref}
        className={css.search}
        placeholder="Search"
        onChange={(e) => setSearch(e.currentTarget.value)}
      />
      <div className={css.list}>
        {(search ? searchedData : treeData).map((item) => (
          <div key={item.key || item.code} className={css.category}>
            {item.category
              ? (
                <Fragment key={item.key}>
                  {item.title}
                  {item.children.map((item) => (
                    <div key={item.code || item.name} className={css.menuItem} onClick={() => onSelect(item)}>
                      {item.title}
                    </div>
                  ))}
                </Fragment>
              ) : (
                <div className={css.menuItem} key={`s_${item.code || item.name}`} onClick={() => onSelect(item)}>
                  {item.title}
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  )
}
