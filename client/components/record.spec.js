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
        key="1"
        title="Moon"
        artist="Bowie"
        price="$33"
        imgURL="./bowie.jpg"
      />
    )
  })

  it('renders Add To Cart text', () => {
    expect(record.find('div').innerHTML()).to.be.equal('ADD TO CART')
  })
})
