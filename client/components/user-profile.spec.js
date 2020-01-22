/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {DisconnectedUserProfile} from './user-profile'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserProfile Component', () => {
  let userprofile

  beforeEach(() => {
    userprofile = shallow(
      <DisconnectedUserProfile getCart={() => {}} email="cody@email.com" />
    )
  })

  it('renders the email in an h3', () => {
    expect(userprofile.find('h3').text()).to.be.equal('Welcome, cody@email.com')
  })
})
