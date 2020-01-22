import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class OrderForm extends React.Component {
  render() {
    return (
      <div>
        <h1>Preview your order:</h1>
        <div>
          <button type="submit" id="submit-order">
            Place Your Order
          </button>
        </div>
        <h3>
          <Link to="/cart">Back to cart</Link>
        </h3>
        <h3>
          <Link to="/">Continue Shopping</Link>
        </h3>
      </div>
    )
  }
}

export default OrderForm
