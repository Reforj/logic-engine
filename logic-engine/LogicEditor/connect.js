import { connect } from 'react-redux'
import {
  addNode, removeNode, changeNodes, changeNode,
} from '../../redux/actions'
import { getNodeList } from '../../redux/selectors'

export default connect((state, props) => ({
  engine: state.engine,
  funcNodes: state.engine.nodes,
  nodeList: getNodeList(state, props.userNodesRegister),
}), {
  addNode,
  removeNode,
  changeNode,
  changeNodes,
})
