import {expect} from 'chai'
import {fetchRecords} from './record'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('records thunk creators', () => {
  let store
  let mockAxios

  const initialState = {defaultRecords: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('get all records', () => {
    it('eventually dispatches the GET_ALL_RECORDS action', async () => {
      const fakeRecords = [
        {
          id: 2,
          title: 'Nevermind',
          artist: 'Nirvana',
          year: 1991,
          imgURL: './images/nirvana.jpg',
          price: 2900,
          genre: 'rock',
          quantity: 10,
          createdAt: '2020-01-16T17:21:14.587Z',
          updatedAt: '2020-01-16T17:21:14.587Z'
        },
        {
          id: 5,
          title: 'Upside Down',
          artist: 'Kiss',
          year: 2010,
          imgURL: './images/kiss.jpg',
          price: 2900,
          genre: 'rock',
          quantity: 10,
          createdAt: '2020-01-16T17:21:14.587Z',
          updatedAt: '2020-01-16T17:21:14.587Z'
        }
      ]

      mockAxios.onGet('/api/records').replyOnce(200, fakeRecords)
      await store.dispatch(fetchRecords())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_ALL_RECORDS')
      expect(actions[0].records).to.be.deep.equal(fakeRecords)
    })
  })
})
