import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ListItem extends Component {
  constructor(props) {
    super(props);
    this.checkBoxState = this.checkBoxState.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <input
          type="checkbox"
          checked={this.props.checked}
          onChange={this.checkBoxState}
        />
        {this.props.content}---{'  '}
        <button onClick={this.removeItem}>删除</button>
      </div>
    );
  }

  checkBoxState() {
    this.props.checkBoxState(this.props.index);
  }

  removeItem() {
    this.props.removeItem(this.props.index);
  }
}

ListItem.propTypes = {
  index: PropTypes.number,
  content: PropTypes.string,
  checked: PropTypes.bool,
  checkBoxState: PropTypes.func,
  removeItem: PropTypes.func,
};
