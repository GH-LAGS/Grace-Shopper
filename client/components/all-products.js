import React from 'react'
import {connect} from 'react-redux'
import Record from './record'

const arrayOfRecords = [
  {
    id: 1,
    name: 'Around The World',
    artist: 'David Bowie',
    year: '2002',
    price: '$33',
    imgURL: './bowie.jpg'
  },
  {
    id: 2,
    name: 'Upside Down',
    artist: 'Nirvana',
    year: '2010',
    price: '$29',
    imgURL: './nirvana.jpg'
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
                title={record.title}
                artist={record.artist}
                price={record.price}
                imgURL={record.imgURL}
              />
            )
          })
        )}
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
