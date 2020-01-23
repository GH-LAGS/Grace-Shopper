import React from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../store/orders'
import {Order} from './ordered-record'

export class OrderHistory extends React.Component {
  componentDidMount() {
    this.props.getAllOrders()
  }

  render() {
    return (
      <div className="allPastOrders">
        <h1>Past Orders: </h1>
        <hr />
        <div className="singlePastOrder">
          {this.props.orders.length === 0 ? (
            <h3>No order history yet!</h3>
          ) : (
            this.props.orders.map(order => {
              let orderDate = order.date
              console.log(
                order.date,
                typeof order.date,
                new Date(order.date).toISOString()
              )
              if (!orderDate.includes('/')) {
                let date = new Date(order.date)
                let year = date.getFullYear()
                let month = (1 + date.getMonth()).toString()
                month = month.length > 1 ? month : '0' + month
                let day = date.getDate().toString()
                day = day.length > 1 ? day : '0' + day
                orderDate = month + '/' + day + '/' + year
              }

              return (
                <div key={order.id} order={order}>
                  <h3 id="datePurchased">Purchased on {orderDate}</h3>
                  {order.Records.map(record => {
                    return (
                      <Order
                        key={record.id}
                        record={record}
                        className="OrderHistory"
                      />
                    )
                  })}
                  <h3 id="totalPrice">
                    Total Price: {`$${order.totalPrice / 100}`}
                  </h3>
                  <hr />
                </div>
              )
            })
          )}
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
