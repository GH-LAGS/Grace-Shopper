import React from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../store/orders'
// import Order from './ordered-record'
import {Grommet, Box, Text, Image} from 'grommet'

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
              return (
                <div key={order.id} order={order}>
                  <h3 id="datePurchased">Purchased on {order.date}</h3>
                  {order.Records.map(record => {
                    return (
                      <div key={record.id} className="OrderHistory">
                        <Box
                          direction="row"
                          justify="between"
                          align="center"
                          pad="small"
                          gap="xsmall"
                          round="small"
                          margin="medium"
                          basis="medium"
                        >
                          <Box
                            pad="medium"
                            background="#5B4037"
                            gap="xsmall"
                            round="small"
                            margin="medium"
                          >
                            <Image
                              src={record.imgURL}
                              alt={record.title}
                              height="200px"
                              width="200px"
                            />
                          </Box>
                          <Text
                            direction="row-responsive"
                            justify="center"
                            weight="bold"
                          >
                            {record.title}
                          </Text>
                          <Text direction="row-responsive" justify="center">
                            {record.artist}
                          </Text>
                          <Text direction="row-responsive" justify="center">
                            {record.RecordOrder.quantity}
                          </Text>
                          <Text direction="row-responsive" justify="center">
                            Price: {`$${record.RecordOrder.soldPrice / 100}`}
                          </Text>
                        </Box>
                      </div>
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
