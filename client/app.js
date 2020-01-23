import React from 'react'
import {Grommet, grommet} from 'grommet'
import {Elements, StripeProvider} from 'react-stripe-elements'

import OrderForm from './components/order-form'
import {Navbar} from './components'
import Routes from './routes'

const customTheme = {
  global: {
    colors: {background: '#FCF1B3'}
  }
}

const App = () => {
  return (
    <StripeProvider apiKey="pk_test_sdNI6NYvTEQrN4kHw0OCgN9a00uelbnBrP">
      <Grommet theme={customTheme}>
        <Navbar />
        <Routes />
        <div className="example">
          <h1>Credit Card</h1>
          <Elements>
            <OrderForm />
          </Elements>
        </div>
      </Grommet>
    </StripeProvider>
  )
}

export default App
