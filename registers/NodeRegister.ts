// { [category]: {[name]: node} }

// {type, pins: [{side: In | out}], view, handler}
export class NodesRegister {
  categories: {}

  views: {}

  constructor () {
    this.categories = {}
    this.views = {}
  }

  define (category, node, component) {
    if (!this.categories[category]) {
      this.categories[category] = {}
    }

    this.categories[category][node.name] = node

    if (component) {
      this.defineView(node.name, component)
    }
  }

  defineView (name, component) {
    if (this.views[name]) { throw new Error(`${name} view already defined`) }
    this.views[name] = component
  }

  getView (name) {
    if (this.views[name]) {
      return this.views[name]
    }
  }

  all () {
    return this.categories
  }
}

export default new NodesRegister()
