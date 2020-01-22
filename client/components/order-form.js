import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {completeOrder} from '../store/cart'
import {
  Grommet,
  Box,
  Text,
  Form,
  Button,
  FormField,
  TextInput,
  Heading
} from 'grommet'

class OrderForm extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Heading>Place your order:</Heading>

        <Form onSubmit={this.props.handlePlaceOrderSubmit}>
          <FormField htmlFor="address" label="Shipping Address">
            <TextInput name="address" type="text" />
          </FormField>

          <Button type="submit" label="Place Order" color="#5FA782" />
        </Form>
      </div>
    )
  }
}

//CONTAINER

const mapStateToProps = state => {
  return {
    cart: state.cart,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handlePlaceOrderSubmit(evt) {
      evt.preventDefault()
      const address = evt.target.address.value
      dispatch(completeOrder(address))

      console.log('Place Order Button Clicked')
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm)
