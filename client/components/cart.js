import React from 'react'
// import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchCart, addToCart, removeFromCart} from '../store/cart'
import {CartItem} from './cart-item'
import OrderForm from './order-form'
import {Button} from 'grommet'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checkout: false
    }
    this.handleSubmitClick = this.handleSubmitClick.bind(this)
  }
  componentDidMount() {
    this.props.getCart()
  }

  handleSubmitClick() {
    this.setState({checkout: true})
  }

  render() {
    let total = 0
    return (
      <div className="allPastOrders">
        <h1>Cart: </h1>
        <hr />
        <div className="singlePastOrder">
          {this.props.cart.length === 0 ? (
            <h3>There are currently no items in the cart.</h3>
          ) : (
            this.props.cart.map(record => {
              total += record.price * record.RecordOrder.quantity / 100
              return (
                <div key={record.id} record={record}>
                  <CartItem
                    key={record.id}
                    record={record}
                    addToCart={this.props.addToCart}
                    removeFromCart={this.props.removeFromCart}
                    className="OrderHistory"
                  />
                  <hr />
                </div>
              )
            })
          )}
          {!this.props.cart || this.props.cart.length === 0 ? (
            <div />
          ) : (
            <div>
              {' '}
              <h3 id="totalPrice">Total Price: {`$${total}`}</h3>
              <Button
                type="button"
                id="checkout"
                label="Checkout"
                color="#5FA782"
                onClick={this.handleSubmitClick}
              />
            </div>
          )}
        </div>
        <div>
          {this.props.cart.length ? (
            this.state.checkout && <OrderForm />
          ) : (
            <div> </div>
          )}
        </div>
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
    getCart: () => dispatch(fetchCart()),
    addToCart: recordId => dispatch(addToCart(recordId)),
    removeFromCart: recordId => dispatch(removeFromCart(recordId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

// TO DO
// Add prop types
// Navbar.propTypes = {
//   handleClick: PropTypes.func.isRequired,
// }
