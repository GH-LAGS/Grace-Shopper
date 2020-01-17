import React from 'react'
import {connect} from 'react-redux'
// import {addToCart} from '../store/record'
import {Grommet, Box, Grid, Text, Button} from 'grommet'

const Record = props => {
  return (
    <Box
      direction="column"
      justify="center"
      align="center"
      pad="large"
      background="#5B4037"
      gap="xsmall"
      round="small"
      margin="medium"
      basis="medium"
    >
      <input type="image" src={props.record.imgURL} className="albumCover" />
      {/* feature-style-react-record */}
      <Text direction="row-responsive" justify="center" weight="">
        {props.record.title}
      </Text>
      <Text direction="row-responsive" justify="center">
        {props.record.artist}
      </Text>
      <Text direction="row-responsive" justify="center">{`$${props.record
        .price / 100}`}</Text>
      <Button direction="row-responsive" justify="center">
        Add To Cart
      </Button>
    </Box>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    // addToCart: recordId => dispatch(addToCart(recordId))
  }
}

export default connect(null, mapDispatchToProps)(Record)
