import React from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'

class Cart extends React.Component {
  constructor() {
    super(props)
    this.state = {checkout: false}
  }
  componentDidMount() {
    this.props.getCart()
  }

  render() {
    return (
      <div>
        {console.log('in component', this.props.cart[0].cartQuantity)}
        <h1>Shopping Cart</h1>
        {this.props.cart === undefined ? (
          <h4>'waiting for cart'</h4>
        ) : (
          // this.props.cart.cart.length === 0 ?
          //   (<p>Your shopping cart is empty.</p>)
          // :

          this.props.cart.map(record => {
            console.log(record)
            return (
              <h4 key={record.id}>
                {record.title} {record.cartQuantity}
              </h4>
            )
          })
        )}
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
  return {
    cart: state.cart,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCart: () => {
      dispatch(fetchCart())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

// TO DO
// Add prop types
// Navbar.propTypes = {
//   handleClick: PropTypes.func.isRequired,
// }
