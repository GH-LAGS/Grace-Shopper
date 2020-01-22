import {expect} from 'chai'
import {fetchCart, gotCart} from './cart'
import {reducer} from './index'
import {gotAllRecords} from './record'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import {createStore} from 'redux'

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
    it('eventually dispatches the GOT_CART action', async () => {
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
      expect(actions[0].type).to.be.equal('GOT_CART')
      expect(actions[0].cart).to.be.deep.equal(fakeCart.Records)
    })
  })
})

describe('redux store', () => {
  describe('action creators', () => {
    const cart = [
      {id: 1, title: 'Blue Sky', artist: 'Nirvana', year: '1999', price: 4000},
      {id: 2, title: 'Red Sky', artist: 'Kiss', year: '1979', price: 3000}
    ]
    const records = [
      {id: 1, title: 'Blue Sky', artist: 'Nirvana', year: '1999', price: 4000},
      {id: 2, title: 'Red Sky', artist: 'Kiss', year: '1979', price: 3000}
    ]
    const GOT_CART = 'GOT_CART'
    const GET_ALL_RECORDS = 'GET_ALL_RECORDS'

    let mock
    before(() => {
      mock = new MockAdapter(axios)
    })

    afterEach(() => {
      mock.reset()
    })

    after(() => {
      mock.restore()
    })

    describe('getCart', () => {
      it('creates an GOT_CART action', () => {
        const fetchCartAction = gotCart(cart)
        expect(fetchCartAction.type).to.equal(GOT_CART)
        expect(fetchCartAction.cart).to.eql(cart)
      })
    })

    describe('gotAllRecords', () => {
      it('creates an GOT_ALL_RECORDS action', () => {
        const gotRecordsAction = gotAllRecords(records)
        expect(gotRecordsAction.type).to.equal(GET_ALL_RECORDS)
        expect(gotRecordsAction.records).to.eql(records)
      })
    })
  })
})

describe('combine reducers', () => {
  it('produces correct initial state', () => {
    let store = createStore(reducer)
    expect(store.getState().cart).to.deep.equal([])
  })
})
