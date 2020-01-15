import React from 'react'
import {connect} from 'react-redux'
import {addToCart} from '../store/record'

const Record = props => {
  return (
    <div className="albumContainer">
      <input type="image" src={props.imgURL} className="albumCover" />
      <div className="middle">
        <div className="addToCartText" onClick={props.addToCart(props.id)}>
          ADD TO CART
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  //don't think i need anything here? don't need to listen for changes in cart, list will always look the same
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: recordId => dispatch(addToCart(recordId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Record)
