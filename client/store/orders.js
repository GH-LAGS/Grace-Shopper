import axios from 'axios'

// ACTION TYPES
const GOT_ALL_ORDERS = 'GOT_ALL_ORDERS'

// INITIAL STATE
const initialState = []

// ACTION CREATORS
export const gotAllOrders = orders => ({
  type: GOT_ALL_ORDERS,
  orders
})

// THUNK CREATORS
export const fetchOrders = () => async dispatch => {
  try {
    const res = await axios.get('/api/orders')
    dispatch(gotAllOrders(res.data))
  } catch (error) {
    console.log('ERROR', error)
  }
}

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_ORDERS:
      return action.orders
    default:
      return state
  }
}
