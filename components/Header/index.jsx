import { connect } from 'react-redux'

const connector = connect((state) => ({
  state,
}), {})

const Header = connector(
  ({ headerContent: HeaderContent, state }) => (HeaderContent ? <HeaderContent state={state} /> : null),
)

export default Header
