import Axios from 'axios'

// ACTION TYPES
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'

// INITIAL STATE
const defaultCart = []

// ACTION CREATORS
const gotCart = cart => ({type: GET_CART, cart})
const addedToCart = record => ({type: ADD_TO_CART, record})

//THUNK
export const fetchCart = () => async dispatch => {
  try {
    const res = await Axios.get('/api/cart')
    dispatch(gotCart(res.data.Records))
  } catch (error) {
    console.log(error)
  }
}

export const addToCart = id => async dispatch => {
  try {
    const res = await Axios.post(`/api/cart/${id}`)
    dispatch(addedToCart(res.data))
  } catch (error) {
    console.log(error)
  }
}

//REDUCER
export default function(state = defaultCart, action) {
  let copyCart = state.cart
  switch (action.type) {
    case GOT_CART:
      return {...state, cart: action.cart}
    case ADD_TO_CART:
      copyCart.push(action.record)
      return {...state, cart: copyCart}
    default:
      return state
  }
}
