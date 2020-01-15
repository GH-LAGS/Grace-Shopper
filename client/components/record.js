import React from 'react'
import {connect} from 'react-redux'
import addToCart from '../store/record'

const Record = props => {
  return (
    <div>
      <h1 onClick={props.addToCart(props.record)}>'click'</h1>

      <div className="albumContainer">
        <input type="image" src={props.record.imgURL} className="albumCover" />
        <div className="middle">
          <div className="addToCartText">ADD TO CART</div>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  console.log('clicked')
  return {
    addToCart: record =>
      //if logged in
      dispatch(addToCart(record))
  }
}

export default connect(null, mapDispatchToProps)(Record)
