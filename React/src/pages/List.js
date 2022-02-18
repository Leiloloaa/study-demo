import React, { Component } from 'react'

export default class List extends Component {

  componentDidMount() {
    console.log(this.props.match.params.id)
  }

  render() {
    return (
      <div>
        我是 List -- {this.props.match.params.id}
      </div>
    )
  }
}
