import React from 'react'
import {expect} from 'chai'

import OrderHistory from './order-history'

import reducer from '../store/index'
import gotAllOrders from '../store/orders'

const orders = [
  {
    title: 'Hot Pink',
    artist: 'Doja Cat',
    date: '01/12/2020',
    RecordOrder: {
      quantity: 1,
      soldPrice: 2900
    }
  },
  {
    title: 'Feel Special',
    artist: 'Twice',
    date: '01/20/2020',
    RecordOrder: {
      quantity: 1,
      soldPrice: 3900
    }
  },
  {
    title: 'X100PRE',
    artist: 'Bad Bunny',
    date: '02/20/2020',
    RecordOrder: {
      quantity: 1,
      soldPrice: 2900
    }
  }
]

describe('Action creator for order-history', () => {
  it('returns properly formatted action', () => {
    expect(
      gotAllOrders(orders).to.be.deeply.equal({
        type: 'GET_ALL_ORDERS',
        orders: orders
      })
    )
  })
})
