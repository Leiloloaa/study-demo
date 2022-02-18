import { CHANGE_INPUT , ADD_LIST_ITEM , DEL_LIST_ITEM , GET_LIST } from '../store/actionType'

// store必须是唯一的，多个store是坚决不允许，只能有一个store空间
// 只有store能改变自己的内容，Reducer不能改变
// Reducer必须是纯函数
const defaultState = {
  inputValue: '123',
  list: ['锻炼身体', '坚持阅读'],
};
// state: 指的是原始仓库里的状态。
// action: 指的是action新传递的状态。
export default (state = defaultState, action) => {
  //就是一个方法函数
  // Reducer里只能接收state，不能改变state。
  // 先判断 方法名 是不是你传过来的
  if (action.type === CHANGE_INPUT) {
    // 再定义一个局部变量
    let newState = JSON.parse(JSON.stringify(state)); // 深度拷贝 state 对象
    newState.inputValue = action.value;
    return newState;
  }

  if (action.type === ADD_LIST_ITEM) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.list.push(newState.inputValue);
    newState.inputValue = '';
    return newState;
  }

  if (action.type === DEL_LIST_ITEM) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.list.splice(action.index, 1);
    return newState;
  }

  if (action.type === GET_LIST) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.list = action.data.data.list ;
    return newState;
  }

  return state;
};
