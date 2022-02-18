// 需要注意 react redux react-redux 是三个不一样的东西
import React, { Component } from 'react';
import store from '../store/index';
import ReactReduxUI from './ReactReduxUI';
import axios from 'axios';
import { getListAction } from '../store/actionCreators';

class ReactRedux extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
  }

  componentDidMount() {
    axios
      .get(
        'https://www.fastmock.site/mock/db08798339cea16d6af5706cac68bc0a/test/api/getList'
      )
      .then((res) => {
        const action = getListAction(res.data);
        store.dispatch(action);
      });
  }

  render() {
    return <ReactReduxUI />;
  }
}

export default ReactRedux;
