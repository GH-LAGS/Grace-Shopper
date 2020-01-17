import React from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../store/orders'
// import Order from './ordered-record'

class OrderHistory extends React.Component {
  componentDidMount() {
    this.props.getAllOrders()
  }

  render() {
    let records = this.props.orders[0]

    console.log('records', records)
    return (
      <div className="allPastOrders">
        <h1>Past Orders: </h1>
        <div className="singlePastOrder">
          {/* {this.props.orders.length === 0 ? (
            <h3>No order history yet!</h3>
          ) : (
            this.props.orders.map(order => {
              return (
              <div key={order.id} order={order}>
              <h1>HELLO</h1>
              <img src={order.}
              </div>
              )
            })
          )} */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllOrders: () => {
      dispatch(fetchOrders())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
