import React from 'react'
import {expect} from 'chai'
import {Order} from './ordered-record'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import reducer from '../store/index'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Order History Component', () => {
  let order

  beforeEach(() => {
    order = shallow(
      <Order
        record={{
          title: 'Hot Pink',
          artist: 'Doja Cat',
          imgURL: './images/dojacat.jpg',
          date: '01/12/2020',
          RecordOrder: {
            quantity: 1,
            soldPrice: 2900
          }
        }}
      />
    )
  })

  it('renders the record title', () => {
    expect(order.contains('Hot Pink')).to.equal(true)
  })

  it('correctly recognizes className', () => {
    expect(order.hasClass('singleOrder')).to.equal(true)
  })
})
