import React from 'react'
import {Grommet, Box, Text, Image} from 'grommet'

export const Order = props => {
  return (
    <Box
      direction="row"
      justify="between"
      align="center"
      pad="small"
      gap="xsmall"
      round="small"
      margin="medium"
      basis="medium"
      className="singleOrder"
    >
      <Box
        pad="medium"
        background="#5B4037"
        gap="xsmall"
        round="small"
        margin="medium"
      >
        <Image
          src={props.record.imgURL}
          alt={props.record.title}
          height="200px"
          width="200px"
        />
      </Box>
      <Text direction="row-responsive" justify="center" weight="bold">
        {props.record.title}
      </Text>
      <Text direction="row-responsive" justify="center">
        {props.record.artist}
      </Text>
      <Text direction="row-responsive" justify="center">
        Qty: {props.record.RecordOrder.quantity}
      </Text>
      <Text direction="row-responsive" justify="center">
        Price: {`$${props.record.RecordOrder.soldPrice / 100}`}
      </Text>
    </Box>
  )
}
