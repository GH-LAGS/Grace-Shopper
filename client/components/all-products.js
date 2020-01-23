import React from 'react'
import {connect} from 'react-redux'
import Record from './record'
import Featured from './featured-items'
import {fetchRecords} from '../store/record'

export class UnconnectAllProducts extends React.Component {
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
        <hr />
        <h3 id="recommendations">
          {' '}
          Not sure what to buy? Here's what our editors like!
        </h3>
        <Featured />
        <a href="#" id="goToTop">
          <img
            alt="Top of page"
            src="/images/top-arrow.png"
            height="15%"
            id="goToTop"
          />
        </a>
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

export default connect(mapStateToProps, mapDispatchToProps)(
  UnconnectAllProducts
)
