export const INIT = 'engine/INIT'
export const RESET = 'engine/RESET'
export const ADD_NODE = 'editor/ADD_NODE'
export const CHANGE_NODE = 'editor/CHANGE_NODE'
export const CHANGE_NODES = 'editor/CHANGE_NODES'
export const REMOVE_NODE = 'editor/REMOVE_NODE'

export const init = (data) => ({ type: INIT, ...data })
export const addNode = (node) => ({ type: ADD_NODE, node })
export const changeNode = (node) => ({ type: CHANGE_NODE, node })
export const changeNodes = (nodes) => ({ type: CHANGE_NODES, nodes })
export const removeNode = (node) => ({ type: REMOVE_NODE, node })
