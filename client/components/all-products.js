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
    const res = await axios.get('/api/records')
    console.log('GOT RECORDS')
    this.setState({records: res.data})
  }

  render() {
    return (
      <div className="container">
        {console.log(this.state)}
        {this.state.records.length === 0 ? (
          <h3>no records to show yet</h3>
        ) : (
          this.state.records.map(record => {
            return <Record key={record.id} record={record} />
          })
        )}
      </div>
    )
  }
}

export default AllProducts
