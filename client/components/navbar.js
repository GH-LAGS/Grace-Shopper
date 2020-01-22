import React from 'react'
import PropTypes from 'prop-types'
import {Header, Box} from 'grommet'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

export const UnconnectNavbar = ({handleClick, isLoggedIn, cart}) => (
  <Header background="#D85434" pad="medium">
    <Box direction="row" align="center" gap="small">
      <Link to="/allproducts" className="navLink" id="name">
        <h1>LAGS RECORDS</h1>
      </Link>
    </Box>

    <nav>
      <div>
        <Link to="/cart" className="navLink">
          Cart(
          {Array.isArray(cart) ? `${cart.length}` : `${cart.cart.length}`})
        </Link>
        <Link to="/allproducts" className="navLink">
          Shop
        </Link>
      </div>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home" className="navLink">
            Profile
          </Link>
          <a href="#" onClick={handleClick} className="navLink">
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login" className="navLink">
            Login
          </Link>
          <Link to="/signup" className="navLink">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  </Header>
)

// CONTAINER
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(UnconnectNavbar)

// // PROP TYPES
// UnconnectNavbar.propTypes = {
//   handleClick: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }
