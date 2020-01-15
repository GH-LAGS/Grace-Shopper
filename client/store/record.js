import Axios from 'axios'

// ACTION TYPES
const GOT_ALL_RECORDS = 'GOT_ALL_RECORDS'

// INITIAL STATE
const defaultRecords = []

// ACTION CREATORS
const gotAllRecords = () => ({type: GOT_ALL_RECORDS})

//THUNK
export const getAllRecords = () => async dispatch => {
  try {
    const res = await Axios.get('/api/records')
    dispatch(gotAllRecords(res.data || defaultRecords))
  } catch (err) {
    console.error(err)
  }
}

// REDUCER
export default function(state = defaultRecords, action) {
  switch (action.type) {
    case GOT_ALL_RECORDS:
      return {...state}
    default:
      return state
  }
}
