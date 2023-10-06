import React from 'react'
import { connect } from 'react-redux'

const connector = connect((state) => ({
  state: state,
}), {})

const Header = connector(
  ({headerContent: HeaderContent, state}) => {
    return HeaderContent ? <HeaderContent state={state} /> : null
  }
)

export default Header
