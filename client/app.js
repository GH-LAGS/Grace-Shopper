import React from 'react'
import {Grommet, grommet} from 'grommet'
import {Navbar} from './components'
import Routes from './routes'

const customTheme = {
  global: {
    colors: {background: '#FCF1B3'}
  }
}

const App = () => {
  return (
    <Grommet theme={customTheme}>
      <Navbar />
      <Routes />
    </Grommet>
  )
}

export default App
