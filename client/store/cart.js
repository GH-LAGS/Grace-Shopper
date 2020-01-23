import Axios from 'axios'

// ACTION TYPES
const GOT_CART = 'GOT_CART'
const ADDED_TO_CART = 'ADDED_TO_CART'
const REMOVED_FROM_CART = 'REMOVED_FROM_CART'
const CHECKOUT = 'CHECKOUT'

// INITIAL STATE
const defaultCart = []

// ACTION CREATORS
export const gotCart = cart => ({type: GOT_CART, cart})
const addedToCart = record => ({
  type: ADDED_TO_CART,
  record
})
const removedFromCart = recordId => ({
  type: REMOVED_FROM_CART,
  recordId
})
const checkout = () => ({type: CHECKOUT})

//THUNK CREATORS
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
    dispatch(addedToCart(res.data.Record))
  } catch (error) {
    console.log(error)
  }
}

export const removeFromCart = id => async dispatch => {
  try {
    await Axios.delete(`/api/cart/${id}`)
    dispatch(removedFromCart(id))
  } catch (error) {
    console.log(error)
  }
}

export const completeOrder = (address, stripeToken) => async dispatch => {
  try {
    await Axios.post('/api/orders/', {address, stripeToken})
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
    case ADDED_TO_CART:
      const newRecord = action.record
      const indexInState = state.findIndex(record => record.id === newRecord.id)
      if (indexInState !== -1) {
        const recordInState = state[indexInState]
        const updatedRecord = {
          ...recordInState,
          RecordOrder: {
            ...recordInState.RecordOrder,
            quantity: recordInState.RecordOrder.quantity + 1
          }
        }
        return [
          ...state.slice(0, indexInState),
          updatedRecord,
          ...state.slice(indexInState + 1)
        ]
      } else {
        return [...state, action.record]
      }
    case REMOVED_FROM_CART:
      console.log(state, action.recordId)
      const foundRecordIndex = state.findIndex(
        record => record.id == action.recordId
      )
      if (state[foundRecordIndex].RecordOrder.quantity === 1) {
        return [
          ...state.slice(0, foundRecordIndex),
          ...state.slice(foundRecordIndex + 1)
        ]
      } else {
        const updatedRecord = {
          ...state[foundRecordIndex],
          RecordOrder: {
            ...state[foundRecordIndex].RecordOrder,
            quantity: state[foundRecordIndex].RecordOrder.quantity - 1
          }
        }
        return [
          ...state.slice(0, foundRecordIndex),
          updatedRecord,
          ...state.slice(foundRecordIndex + 1)
        ]
      }
    case CHECKOUT:
      return []
    default:
      return state
  }
}
