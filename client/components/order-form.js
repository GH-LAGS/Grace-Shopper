import React from 'react'
import {connect} from 'react-redux'
import {CardElement, injectStripe} from 'react-stripe-elements'
import {completeOrder} from '../store/cart'
import {Form, Button, FormField, TextInput, Heading} from 'grommet'
import {Link} from 'react-router-dom'

class OrderForm extends React.Component {
  constructor(props) {
    super(props)
    this.firstNameRef = React.createRef()
    this.lastNameRef = React.createRef()
    this.addressRef = React.createRef()
  }

  handlePlaceOrderSubmit = async evt => {
    evt.preventDefault()

    const firstName = this.firstNameRef.current.value
    const lastName = this.lastNameRef.current.value
    const address = this.addressRef.current.value

    if (!firstName || !lastName || !address) {
      alert('Missing information!')
      return
    }

    let {token} = await this.props.stripe.createToken({name: 'Name'})
    await this.props.completeOrder({address, stripeToken: token.id})
  }

  render() {
    return (
      <div>
        <div className="checkout" />
        <Heading>Place your order:</Heading>
        <Form onSubmit={this.handlePlaceOrderSubmit}>
          <FormField htmlFor="first-name" label="First Name">
            <TextInput name="first-name" type="text" ref={this.firstNameRef} />
          </FormField>
          <FormField htmlFor="last-name" label="Last Name">
            <TextInput name="last-name" type="text" ref={this.lastNameRef} />
          </FormField>
          <FormField htmlFor="address" label="Shipping Address">
            <TextInput name="address" type="text" ref={this.addressRef} />
          </FormField>
          <h2 id="credit">Credit Card</h2>
          <CardElement style={{base: {fontSize: '20px'}}} />
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
    completeOrder(details) {
      dispatch(completeOrder(details.address, details.stripeToken))
    }
  }
}

export default injectStripe(
  connect(mapStateToProps, mapDispatchToProps)(OrderForm)
)
