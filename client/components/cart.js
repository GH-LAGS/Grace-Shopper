import React from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchCart, addToCart, removeFromCart} from '../store/cart'
import {CartItem} from './cart-item'
import OrderForm from './order-form'

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
          {this.props.cart === undefined ? (
            <h3>Nothing in your cart yet!</h3>
          ) : (
            this.props.cart.map(record => {
              total += record.price / 100
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
          <h3 id="totalPrice">Total Price: {`$${total}`}</h3>
          <button type="button" id="checkout" onClick={this.handleSubmitClick}>
            Checkout
          </button>
        </div>
        <div>{this.state.checkout && <OrderForm />}</div>
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
    // handleSubmitClick: () => this.setState({checkout: true})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
