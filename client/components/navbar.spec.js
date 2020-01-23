import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {UnconnectNavbar} from './navbar'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Navbar Component', () => {
  let navbar
  beforeEach(() => {
    navbar = shallow(
      <UnconnectNavbar
        cart={[]}
        isLoggedIn={() => {
          return true
        }}
        handleClick={() => {}}
      />
    )
  })

  it('renders img header', () => {
    expect(navbar.find('img').prop('src')).to.be.equal('/logo.png')
  })
  it('renders switch links to routes', () => {
    expect(navbar.find('Link').length).to.be.equal(4)
  })
})
