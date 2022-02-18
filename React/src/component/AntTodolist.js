import React, { Component } from 'react';
import store from '../store/index'; // 写成这种方式是可以的 webpack 会自动检索 index 文件
import AntTodolistUI from './AntTodolistUI';

import {
  changeInputAction,
  addListItemAction,
  delListItemAction,
  getListItem
} from '../store/actionCreators';

class AntTodoList extends Component {
  constructor(props) {
    super(props);
    //关键代码-----------start
    this.state = store.getState();
    //关键代码-----------end
    this.onChangeInputValue = this.onChangeInputValue.bind(this);
    this.addListItem = this.addListItem.bind(this);
    this.delItem = this.delItem.bind(this);
    this.storeChange = this.storeChange.bind(this); // 用来改变 inputValue 值
    store.subscribe(this.storeChange); // 订阅 Redux 的状态
  }

  componentDidMount() {
    getListItem();
  }

  // 组件卸载，移除时调用该函数，一般取消，清理已注册的订阅，定时器的清理，取消网络请求，在这里面操作
  // componentWillUnmount() {
  //   store.unsubscribe(this.storeChange); // 取消订阅，清理已注册的监听
  // }

  render() {
    return (
      // 一定要注意 传给子组件 属性 和 方法 的名称！！！！
      <AntTodolistUI
        onChangeInputValue={this.onChangeInputValue}
        inputValue={this.state.inputValue}
        addListItem={this.addListItem}
        list={this.state.list}
        delItem={this.delItem}
      />
    );
  }

  onChangeInputValue(e) {
    const action = changeInputAction(e.target.value);
    store.dispatch(action); // action 就创建好了，但是要通过 dispatch() 方法传递给 store
  }

  addListItem() {
    if(!this.state.inputValue) return;
    const action = addListItemAction();
    store.dispatch(action);
  }

  delItem(index) {
    const action = delListItemAction(index);
    store.dispatch(action);
  }

  storeChange() {
    this.setState(store.getState());
  }
}
export default AntTodoList;
