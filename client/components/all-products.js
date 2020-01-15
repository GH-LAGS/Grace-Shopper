import React from 'react'
import {connect} from 'react-redux'
import Record from './record'
import axios from 'axios'

class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {records: []}
  }

  async componentDidMount() {
    // this.props.getRecords()
    const res = await axios.get('/api/records')
    console.log('GOT RECORDS')
    this.setState({records: res.data})
  }

  render() {
    // const arrayOfRecords = this.props.records.records

    return (
      <div className="container">
        {console.log(this.state)}
        {this.state.records.length === 0 ? (
          <h3>no records to show yet</h3>
        ) : (
          this.state.records.map(record => {
            return <Record record={record} />
          })
        )}
      </div>
    )
  }
}

export default AllProducts
