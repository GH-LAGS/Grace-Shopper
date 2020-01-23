import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {UnconnectAllProducts} from './all-products'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('All Products Component', () => {
  let allProducts
  beforeEach(() => {
    allProducts = shallow(
      <UnconnectAllProducts
        records={[
          {
            id: 1,
            title: 'Aladdin Sane',
            artist: 'David Bowie',
            year: '1973',
            imgURL: './images/bowie.jpg',
            price: 3300,
            genre: 'rock',
            quantity: 10
          },
          {
            id: 2,
            title: 'Aladdin Sane',
            artist: 'David Bowie',
            year: '1973',
            imgURL: './images/bowie.jpg',
            price: 3300,
            genre: 'rock',
            quantity: 10
          }
        ]}
        getAllRecords={() => {}}
      />
    )
  })

  it('iterates through records when list exists', () => {
    expect(allProducts.contains('no records to show yet')).to.equal(false)
  })
  it('renders classNames in HTML', () => {
    expect(allProducts.hasClass('container')).to.be.equal(true)
  })
})
