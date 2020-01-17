import axios from 'axios'

// ACTION TYPES
const GET_ALL_ORDERS = 'GET_ALL_ORDERS'

// INITIAL STATE
const initialState = []

// ACTION CREATORS
export const gotAllOrders = orders => ({
  type: GET_ALL_ORDERS,
  orders
})

// THUNK CREATORS
export const fetchOrders = () => async dispatch => {
  console.log('THUNK')
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
    case GET_ALL_ORDERS:
      console.log('action', action.orders)
      return action.orders
    default:
      return state
  }
}
