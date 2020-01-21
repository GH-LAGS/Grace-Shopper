/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Record} from './record'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Record Component', () => {
  let record

  beforeEach(() => {
    record = shallow(
      <Record
        key={1}
        record={{
          title: 'Aladdin Sane',
          artist: 'David Bowie',
          year: 1973,
          imgURL: './images/bowie.jpg',
          price: 3300,
          genre: 'rock',
          quantity: 10
        }}
      />
    )
  })
  xit('renders Add To Cart text', () => {
    expect(record.find('div').innerHTML()).to.be.equal('ADD TO CART')
  })
  it('renders the album cover', () => {
    expect(record.find('input').prop('src')).to.be.equal('./images/bowie.jpg')
  })
  it('renders the record title', () => {
    expect(record.contains('Aladdin Sane')).to.equal(true)
  })
})
