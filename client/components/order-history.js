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
          {this.props.orders.length === 0 ? (
            <h3>No order history yet!</h3>
          ) : (
            this.props.orders.map(order => {
              return (
                <div key={order.id} order={order}>
                  <h3 id="datePurchased">Purchased on {order.date}</h3>
                  <h3 id="totalPrice">
                    Total Price: {`$${order.totalPrice / 100}`}
                  </h3>
                  {order.Records.map(record => {
                    return (
                      <div key={record.id}>
                        <img
                          src={record.imgURL}
                          alt={record.title}
                          height="75"
                          width="75"
                        />
                        <p id="recordTitle">{record.title}</p>
                        <p id="recordArtist">{record.artist}</p>
                        <p id="quantity">{record.RecordOrder.quantity}</p>
                        <p id="priceSold">
                          Price: {`$${record.RecordOrder.soldPrice / 100}`}
                        </p>
                      </div>
                    )
                  })}
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
