import Axios from 'axios'

// ACTION TYPES
const GOT_CART = 'GOT_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const CHECKOUT = 'CHECKOUT'

// INITIAL STATE
const defaultCart = []

// ACTION CREATORS
const gotCart = cart => ({type: GOT_CART, cart})
const addedToCart = record => ({type: ADD_TO_CART, record})
const updateQuantity = record => ({type: UPDATE_QUANTITY, record})
const checkout = () => ({type: CHECKOUT})

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
    //check for duplicate
    if (res.data.isDuplicate) {
      dispatch(updateQuantity(res.data.record))
    } else {
      dispatch(addedToCart(res.data.record))
    }
  } catch (error) {
    console.log(error)
  }
}

export const completeOrder = () => async dispatch => {
  try {
    await Axios.post('/api/order/')
    dispatch(checkout())
  } catch (error) {
    console.log(error)
  }
}

//REDUCER
export default function(state = defaultCart, action) {
  switch (action.type) {
    case GOT_CART:
      return [...action.cart]
    case ADD_TO_CART:
      action.record.cartQuantity = 1
      return [...state, action.record]
    case UPDATE_QUANTITY:
      const record = state.filter(record => record.id === action.record.id)[0]
      record.cartQuantity++
      return [...state]
    case CHECKOUT:
      return []
    default:
      return state
  }
}
