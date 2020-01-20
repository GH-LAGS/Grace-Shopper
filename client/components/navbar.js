import React from 'react'
import PropTypes from 'prop-types'
import {Anchor, Grommet, Nav, Header, Box} from 'grommet'
import {grommet} from 'grommet/themes'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <Header background="dark-1" pad="medium">
    <Box direction="row" align="center" gap="small">
      <div id="left-nav">
        <h1>LAGS RECORDS</h1>
        <h3>
          <Link to="/allproducts">Shop</Link>
        </h3>
      </div>
    </Box>
    <div id="navbar">
      <Nav>
        <div>
          <Link to="/cart">Cart</Link>
        </div>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </Nav>
    </div>
    <hr />
  </Header>
)

// CONTAINER
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

// PROP TYPES
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
