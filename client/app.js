import React from 'react'
import {Grommet} from 'grommet'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <Grommet plain>
      <Navbar />
      <Routes />
    </Grommet>
  )
}

export default App
