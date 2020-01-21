import React from 'react'
import {Grommet, Box, Image, Carousel} from 'grommet'

const Featured = props => {
  return (
    <Box height="medium" width="xlarge" overflow="hidden">
      <Carousel fill>
        <Image
          fit="contain"
          src="/images/fleetwood-mac.jpg"
          alignSelf="center"
          height="50%"
          width="50%"
          margin="2%"
        />
        <Image
          fit="contain"
          src="/images/smiths.jpg"
          alignSelf="center"
          height="50%"
          width="50%"
          margin="2%"
        />
        <Image
          fit="contain"
          src="/images/bowie.jpg"
          alignSelf="center"
          height="50%"
          width="50%"
          margin="2%"
        />
      </Carousel>
    </Box>
  )
}

export default Featured
