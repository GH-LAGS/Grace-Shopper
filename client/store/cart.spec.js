import {expect} from 'chai'
import {fetchCart} from './cart'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('cart thunk creators', () => {
  let store
  let mockAxios

  const initialState = {cart: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('get cart', () => {
    it('eventually dispatches the GET_CART action', async () => {
      const fakeCart = {
        Records: [
          {
            id: 2,
            title: 'Nevermind',
            artist: 'Nirvana',
            year: 1991,
            imgURL: './images/nirvana.jpg',
            price: 2900,
            genre: 'rock',
            quantity: 10,
            createdAt: '2020-01-19T18:47:34.657Z',
            updatedAt: '2020-01-19T18:47:34.657Z',
            RecordOrder: {
              quantity: 1,
              soldPrice: 2900,
              createdAt: '2020-01-19T18:47:34.694Z',
              updatedAt: '2020-01-19T18:47:34.694Z',
              orderId: 2,
              recordId: 2
            }
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
            createdAt: '2020-01-19T18:47:34.657Z',
            updatedAt: '2020-01-19T18:47:34.657Z',
            RecordOrder: {
              quantity: 1,
              soldPrice: 2900,
              createdAt: '2020-01-19T18:47:34.694Z',
              updatedAt: '2020-01-19T18:47:34.694Z',
              orderId: 2,
              recordId: 5
            }
          }
        ]
      }

      mockAxios.onGet('/api/cart').replyOnce(200, fakeCart)
      await store.dispatch(fetchCart())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_CART')
      expect(actions[0].cart).to.be.deep.equal(fakeCart.Records)
    })
  })
})
