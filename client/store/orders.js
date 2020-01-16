import axios from 'axios'

const GET_ALL_ORDERS = 'GET_ALL_ORDERS'

const initialState = []

const gotAllOrders = orders => ({
  type: GET_ALL_ORDERS,
  orders
})

export const fetchOrders = () => async dispatch => {
  try {
    const res = await axios.get('/api/orders')
    dispatch(gotAllOrders(res.data))
  } catch (error) {
    console.log('ERROR', error)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return action.orders
    default:
      return state
  }
}
