import React from 'react'
import {connect} from 'react-redux'
import Record from './record'
import axios from 'axios'
import {fetchRecords} from '../store/record'
import {Grommet, Box, Grid, Text, Button} from 'grommet'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getAllRecords()
  }

  render() {
    return (
      <div className="container">
        {console.log('THIS.PROPS.RECORDS', this.props.records)}
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
      dispatch(fetchRecords())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
