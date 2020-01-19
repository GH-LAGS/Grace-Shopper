import Axios from 'axios'
import {runInNewContext} from 'vm'

// ACTION TYPES
const GET_CART = 'GET_CART'

// INITIAL STATE
const defaultCart = []

// ACTION CREATORS
const gotCart = cart => ({type: GET_CART, cart})

//THUNK
export const fetchCart = () => async dispatch => {
  try {
    const res = await Axios.get('/api/cart')
    dispatch(gotCart(res.data.Records))
  } catch (error) {
    console.log(error)
  }
}

//REDUCER
export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return {...state, cart: action.cart}
    default:
      return state
  }
}
