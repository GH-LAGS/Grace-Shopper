import React from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'
import {Order} from './ordered-record'

class Cart extends React.Component {
  componentDidMount() {
    this.props.getCart()
  }

  // render() {
  //   let total = 0
  //   return (
  //     <div className="cart">
  //       <h1>Cart</h1>
  //         <div className="singleRecord">
  //           {this.props.cart === undefined ? (
  //             <h4>'waiting for cart'</h4>
  //           ) : (
  //             this.props.cart.map(record => {
  //               total += (record.RecordOrder.soldPrice / 100)
  //               return (
  //                 <div>
  //                   <Order key={record.id}
  //                     record={record}
  //                     className="OrderHistory"
  //                   />
  //                 </div>
  //               )})
  //               <h3 id="totalPrice">Total Price: ${total}</h3>
  //               <button type="button" id="checkout">Checkout</button>
  //               <Link to="/preview">Order Preview Page</Link>

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
              total += record.RecordOrder.soldPrice / 100
              return (
                <div key={record.id} record={record}>
                  <Order
                    key={record.id}
                    record={record}
                    className="OrderHistory"
                  />
                  <hr />
                </div>
              )
            })
          )}
          <h3 id="totalPrice">Total Price: {`$${total}`}</h3>
          <button type="button" id="checkout">
            Checkout
          </button>
          <br />
          <Link to="/preview">Order Preview Page</Link>
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
    getCart: () => {
      dispatch(fetchCart())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
