/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Record} from './record'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Record Component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <Record
        key={1}
        record={{
          title: 'Aladdin Sane',
          artist: 'David Bowie',
          year: '1973',
          imgURL: './images/bowie.jpg',
          price: 3300,
          genre: 'rock',
          quantity: 10
        }}
      />
    )
  })

  it('renders the album cover', () => {
    expect(wrapper.find('input').prop('src')).to.be.equal('./images/bowie.jpg')
  })
  it('renders the record title', () => {
    expect(wrapper.contains('Aladdin Sane')).to.equal(true)
  })
  it('renders the record artist', () => {
    expect(wrapper.contains('David Bowie')).to.equal(true)
  })
  it('renders the record price with division adjustment', () => {
    expect(wrapper.contains('$33')).to.equal(true)
  })
})
