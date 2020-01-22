import Axios from 'axios'

// ACTION TYPES
const GOT_CART = 'GOT_CART'
const ADD_TO_CART = 'ADD_TO_CART'

// INITIAL STATE
const defaultCart = []

// ACTION CREATORS
export const gotCart = cart => ({type: GOT_CART, cart})
export const addedToCart = record => ({
  type: ADD_TO_CART,
  record
})

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
    dispatch(
      addedToCart({...res.data.record, recordOrder: {...res.data.recordOrder}})
    )
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
      return [...state, action.record]
    default:
      return state
  }
}
