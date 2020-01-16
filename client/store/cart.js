//placeholder for reducer and thunk and action creator and action dispatcher

// ACTION TYPES
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'

// INITIAL STATE
const defaultCart = []

// ACTION CREATORS
const getCart = cart => ({type: GET_CART, cart})
const addToCart = recordId => ({type: ADD_TO_CART, record})
const deleteFromCart = recordId => ({type: DELETE_FROM_CART, record})

//REDUCER
export default function(state = defaultCart, action) {
  switch (action.type) {
    default:
      return state
    // case GET_CART:
    //   return action.cart
  }
}
