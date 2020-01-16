import React from 'react'
import {connect} from 'react-redux'
// import {addToCart} from '../store/record'

const Record = props => {
  return (
    <div className="albumContainer">
      <input type="image" src={props.record.imgURL} className="albumCover" />
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
