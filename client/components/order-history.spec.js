import React from 'react'
import {expect} from 'chai'

const adapter = new Adapter()
Enzyme.configure({adapter})

import OrderHistory from './order-history'

describe('Testing data', () => {
  const RECORD1 = [
    {
      title: 'Hot Pink',
      artist: 'Doja Cat',
      date: '01/12/2020',
      RecordOrder: {
        quantity: 1,
        soldPrice: 2900
      }
    }
  ]
  const RECORD2 = [
    {
      title: 'Feel Special',
      artist: 'Twice',
      date: '01/20/2020',
      RecordOrder: {
        quantity: 1,
        soldPrice: 3900
      }
    }
  ]
  const RECORD3 = [
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

  describe('<Order History /> component', () => {
    let orderHistory

    beforeEach('Create component', () => {
      orderHistory = shallow(<OrderHistory />)
    })
  })
})
