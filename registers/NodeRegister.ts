import { NodeCode, NodesData } from '../consts/NodesData'
// { [category]: {[name]: node} }

// {type, pins: [{side: In | out}], view, handler}
export class NodesRegister {
  categories: {}

  views: {}

  nodeInfo: {}

  constructor () {
    this.categories = {}
    this.views = {}
    this.nodeInfo = {}
  }

  define (category, node, component) {
    if (!this.categories[category]) {
      this.categories[category] = {}
    }

    this.categories[category][node.name] = node
    this.nodeInfo[node.name] = node

    if (component) {
      this.defineView(node.name, component)
    }
  }

  defineView (type, component) {
    if (this.views[type]) { throw new Error(`${type} view already defined`) }
    this.views[type] = component
  }

  getView (type) {
    if (this.views[type]) {
      return this.views[type]
    }
  }

  all () {
    return this.categories
  }
}

export default new NodesRegister()
