import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Form, Button, FormField, TextInput} from 'grommet'

class OrderForm extends React.Component {
  render() {
    return (
      <div>
        <h3>Place your order:</h3>

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
