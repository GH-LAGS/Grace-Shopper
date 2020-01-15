import React from 'react'
import {connect} from 'react-redux'
import Record from './record'
import axios from 'axios'
import getAllRecords from '../store'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getAllRecords()
  }

  render() {
    return (
      <div className="container">
        {this.props.records.length === 0 ? (
          <h3>no records to show yet</h3>
        ) : (
          this.props.records.map(record => {
            return <Record key={record.id} record={record} />
          })
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    records: state.records
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllRecords: () => {
      dispatch(getAllRecords())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
