import React from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class Cart extends React.Component {
  // constructor() {
  //   super()
  // }

  render() {
    return (
      <div>
        <h1>Shoping Cart</h1>
        <div>
          <p>Your shopping cart is empty.</p>
        </div>
        <button type="button" id="checkout">
          Checkout
        </button>
        <p>This button, once implemented will link to order preview page.</p>
        <Link to="/preview">Order Preview Page</Link>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {cart: state.cart}
}

const mapDispatchToProps = dispatch => {
  return {
    // handleClick {}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

// TO DO
// Add prop types
// Navbar.propTypes = {
//   handleClick: PropTypes.func.isRequired,
// }
