import React from 'react'
import {connect} from 'react-redux'
// import {addToCart} from '../store/record'
import {Grommet, Box, Grid, Text, Button} from 'grommet'

const Record = props => {
  return (
    <div className="albumContainer">
      <Box
        direction="row-responsive"
        justify="center"
        align="center"
        pad="xlarge"
        background="dark-2"
        gap="medium"
        round="small"
        margin="xlarge"
      >
        <input type="image" src={props.record.imgURL} className="albumCover" />
        <Text direction="row-responsive" justify="center">
          {props.record.title}
        </Text>
        <Text direction="row-responsive" justify="center">
          {props.record.artist}
        </Text>
        <Text direction="row-responsive" justify="center">{`$${props.record
          .price / 100}`}</Text>
      </Box>

      <div className="middle">
        {/* <div className="addToCartText">ADD TO CART</div> */}
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    // addToCart: recordId => dispatch(addToCart(recordId))
  }
}

export default connect(null, mapDispatchToProps)(Record)
