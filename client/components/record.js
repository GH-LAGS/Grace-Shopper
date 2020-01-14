import React from 'react'
import {connect} from 'react-redux'
import {addRecordToCart} from '../store/record'

const Record = props => {
  return (
    <div className="albumContainer">
      <input type="image" src={props.imgURL} className="albumCover" />
      {/* onClick={props.addToCart(props.id)} */}
      <div className="middle">
        <div className="addToCartText">ADD TO CART</div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  //don't think i need anything here? don't need to listen for changes in cart, list will always look the same
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: recordId => dispatch(addRecordToCart(recordId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Record)
