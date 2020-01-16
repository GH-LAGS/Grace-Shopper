import axios from 'axios'

// ACTION TYPES
const GET_ALL_RECORDS = 'GET_ALL_RECORDS'

// INITIAL STATE
const defaultRecords = []

// ACTION CREATORS
const gotAllRecords = records => ({
  type: GET_ALL_RECORDS,
  records
})

// THUNK CREATORS
export const fetchRecords = () => async dispatch => {
  try {
    console.log('FETCHING IN THUNK')
    const res = await axios.get('/api/records')
    dispatch(gotAllRecords(res.data))
  } catch (error) {
    console.log('ERROR IN THUNK', error)
  }
}

// REDUCER
export default function(state = defaultRecords, action) {
  switch (action.type) {
    case GET_ALL_RECORDS:
      return action.records
    default:
      return state
  }
}
