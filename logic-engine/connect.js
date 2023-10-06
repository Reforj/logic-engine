import { connect } from 'react-redux'
import { init } from '../redux/actions'

export default connect((state) => ({
  state: state,
}), {
  init
})
