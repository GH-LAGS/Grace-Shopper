import React from 'react'
import {connect} from 'react-redux'
import Record from './record'

const arrayOfRecords = [
  {
    id: 1,
    name: 'Around The World',
    artist: 'Weezer',
    year: '2002',
    price: '$33'
  },
  {
    id: 2,
    name: 'Upside Down',
    artist: 'Katy Perry',
    year: '2010',
    price: '$29'
  },
  {
    id: 3,
    name: 'Pineapples',
    artist: 'Aerosmith',
    year: '1990',
    price: '$35'
  }
]

class AllProducts extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // this.props.getRecords()
  }

  render() {
    // const arrayOfRecords = this.props.records.records

    return (
      <div className="container">
        <h1>ALL RECORDS</h1>

        {arrayOfRecords === undefined ? (
          <h3>no records to show yet</h3>
        ) : (
          arrayOfRecords.map(record => {
            return (
              <Record
                key={record.id}
                name={record.name}
                artist={record.artist}
                price={record.price}
              />
            )
          })
        )}
        {/*<Record key={record.id} name={record.name} artist={record.artist} price={record.price} />*/}
      </div>
    )
  }
}

const mapStateToProps = state => {
  // records: state.records
}

const mapDispatchToProps = dispatch => {
  //this.getRecords
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
