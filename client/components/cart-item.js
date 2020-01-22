import React from 'react'
import {Grommet, Button, Box, Text, Image} from 'grommet'
import {addToCart} from '../store/cart'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

export const CartItem = props => {
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
      <Button direction="row-responsive" justify="center">
        -
      </Button>
      <Text direction="row-responsive" justify="center">
        Qty: {props.record.RecordOrder.quantity}
      </Text>
      {/* <Button
        onClick={() => props.addToCart(props.record.id)}
        direction="row-responsive"
        justify="center"
      >
        +
      </Button> */}
      <Text direction="row-responsive" justify="center">
        Price: {`$${props.record.price / 100}`}
      </Text>
    </Box>
  )
}

export default CartItem

CartItem.propTypes = {
  // addToCart: PropTypes.func.isRequired
}
