import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import OrderHistory from './order-history'

/**
 * COMPONENT
 */
export const userprofile = props => {
  const {email} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <OrderHistory />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(userprofile)

/**
 * PROP TYPES
 */
userprofile.propTypes = {
  email: PropTypes.string
}
