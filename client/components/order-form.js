import React from 'react'
import {connect} from 'react-redux'
import {CardElement, injectStripe} from 'react-stripe-elements'
import {completeOrder} from '../store/cart'
import {Form, Button, FormField, TextInput, Heading} from 'grommet'

class OrderForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {complete: false}
    this.submit = this.submit.bind(this)
  }
  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: 'Name'})
    let response = await fetch('/charge', {
      method: 'POST',
      headers: {'Content-Type': 'text/plain'},
      body: token.id
    })

    if (response.ok) {
      console.log('Purchase Complete!')
      this.setState({complete: true})
    }
  }
  render() {
    return (
      <div>
        <div className="checkout">
          <CardElement />
        </div>
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

export default injectStripe(
  connect(mapStateToProps, mapDispatchToProps)(OrderForm)
)
