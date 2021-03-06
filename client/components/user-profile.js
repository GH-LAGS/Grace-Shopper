import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import OrderHistory from './order-history'
import {fetchCart} from '../store/cart'

/**
 * COMPONENT
 */
export class DisconnectedUserProfile extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getCart()
  }

  render() {
    return (
      <div>
        <h3>Welcome, {this.props.email}</h3>
        <OrderHistory />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

const mapDispatch = dispatch => {
  return {
    getCart: () => {
      dispatch(fetchCart())
    }
  }
}

export default connect(mapState, mapDispatch)(DisconnectedUserProfile)

/*
 * PROP TYPES
 */
DisconnectedUserProfile.propTypes = {
  email: PropTypes.string
}
