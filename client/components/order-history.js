import React from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../store/orders'
// import Order from './ordered-record'

class OrderHistory extends React.Component {
  componentDidMount() {
    this.props.getAllOrders()
  }

  render() {
    return (
      <div className="allPastOrders">
        <h1>Past Orders: </h1>
        <div className="singlePastOrder">
          {/* {this.state.orders.length === 0 ? (
            <h3>No order history yet!</h3>
          ) : (
            this.props.order.map(order => {
              return <div key={order.id} order={order} />
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
