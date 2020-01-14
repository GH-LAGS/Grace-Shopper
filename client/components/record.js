import React from 'react'
import {connect} from 'react-redux'

const Record = props => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

const mapStateToProps = state => {
  // return ()
  // cart: state.cart
  //what is it called in redux store?
}

const mapDispatchToProps = dispatch => {
  //add add record button and functionality
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Record)
