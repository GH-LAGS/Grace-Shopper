import React from 'react'
import {Grommet, Box, Image, Carousel} from 'grommet'

const Featured = props => {
  return (
    <Box height="medium" width="xlarge" overflow="hidden">
      <Carousel fill>
        <Image
          fit="cover"
          src="/public/images/fleetwood-mac.jpg"
          height="200px"
          width="200px"
        />
        <Image
          fit="cover"
          src="/public/images/smiths.jpg"
          height="200px"
          width="200px"
        />
        <Image
          fit="cover"
          src="/public/images/bowie.jpg"
          height="200px"
          width="200px"
        />
      </Carousel>
    </Box>
  )
}

export default Featured
