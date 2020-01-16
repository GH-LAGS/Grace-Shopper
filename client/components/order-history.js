import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
// import Order from './ordered-record'

class OrderHistory extends React.Component {
  render() {
    return (
      <div className="allPastOrders">
        <h1>Past Orders: </h1>
        <div className="singlePastOrder">
          {/* individual ordered record component */}
          {this.state.orders.length === 0 ? (
            <h3>No order history yet!</h3>
          ) : (
            this.state.orders.map(order => {
              return <div key={order.id} order={order} />
            })
          )}
        </div>
      </div>
    )
  }
}

export default OrderHistory
