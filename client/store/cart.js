import Axios from 'axios'

// ACTION TYPES
const GOT_CART = 'GOT_CART'
const ADDED_TO_CART = 'ADDED_TO_CART'
const DELETED_FROM_CART = 'DELETED_FROM_CART'

// INITIAL STATE
const defaultCart = []

// ACTION CREATORS
const gotCart = () => ({type: GOT_CART})
const addedToCart = record => ({type: ADDED_TO_CART, record})
const deletedFromCart = record => ({type: DELETED_FROM_CART, record})

//LOGGED IN CONDITIONAL THUNK
export const addToCart = record => async dispatch => {
  try {
    const res = await Axios.post('/api/cart', {record})
    dispatch(addedToCart(res.data || defaultCart))
  } catch (err) {
    console.error(err)
  }
}

export const deleteFromCart = record => async dispatch => {
  try {
    const res = await Axios.delete('/api/cart', {params: {id: record.id}})
    dispatch(deletedFromCart(res.data || defaultCart))
  } catch (err) {
    console.error(err)
  }
}

export const getCart = () => async dispatch => {
  try {
    const res = await Axios.get('/api/cart')
    dispatch(getCart(res.data || defaultCart))
  } catch (err) {
    console.error(err)
  }
}

// REDUCER
export default function(state = defaultCart, action) {
  switch (action.type) {
    case GOT_CART:
      return state
    case ADDED_TO_CART:
      return [...state, action.record]
    case DELETED_FROM_CART:
      return [...state.filter(record => record.id !== action.record.id)]
    default:
      return state
  }
}
