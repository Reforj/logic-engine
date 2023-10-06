export const INIT = 'engine/INIT'
export const RESET = 'engine/RESET'
export const ADD_NODE = 'editor/ADD_NODE'
export const CHANGE_NODE = 'editor/CHANGE_NODE'
export const CHANGE_NODES = 'editor/CHANGE_NODES'
export const REMOVE_NODE = 'editor/REMOVE_NODE'
export const REMOVE_NODES = 'editor/REMOVE_NODES'

export const init = (data) => ({type: INIT, ...data})
export const addNode = (node, ui) => ({ type: ADD_NODE, node, ui })
export const changeNode = (node, ui) => ({ type: CHANGE_NODE, node, ui })
export const changeNodes = (nodes, ui) => ({ type: CHANGE_NODES, nodes, ui })
export const removeNode = (node, ui) => ({ type: REMOVE_NODE, node, ui })
export const removeNodes = (data, ui) => ({ type: REMOVE_NODES, data, ui })
