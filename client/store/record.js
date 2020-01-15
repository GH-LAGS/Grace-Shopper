import Axios from 'axios'

// ACTION TYPES
const GOT_ALL_RECORDS = 'GOT_ALL_RECORDS'

// INITIAL STATE
const defaultRecords = []

// ACTION CREATORS
const gotAllRecords = records => ({type: GOT_ALL_RECORDS, records})

//THUNK
//can access empty array in all product component, not passing component did mount
export const getAllRecords = () => async dispatch => {
  try {
    const res = await Axios.get('/api/records')
    console.log('res.data in thunk axios req', res.data)
    dispatch(gotAllRecords(res.data || defaultRecords))
  } catch (err) {
    console.error(err)
  }
}

// REDUCER
export default function(state = defaultRecords, action) {
  switch (action.type) {
    case GOT_ALL_RECORDS:
      return action.records
    default:
      return state
  }
}
