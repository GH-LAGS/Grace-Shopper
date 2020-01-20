import Axios from 'axios'
import {runInNewContext} from 'vm'

//placeholder for reducer and thunk and action creator and action dispatcher

// ACTION TYPES
const GOT_CART = 'GOT_CART'

// INITIAL STATE
const defaultCart = []

// ACTION CREATORS
const gotCart = cart => ({type: GOT_CART, cart})

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
    case GOT_CART:
      return {...state, cart: action.cart}
    default:
      return state
  }
}
