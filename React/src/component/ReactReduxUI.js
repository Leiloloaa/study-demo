// 需要注意 react redux react-redux 是三个不一样的东西
import React from 'react';
import { connect } from 'react-redux'; //引入连接器
import {
  changeInputAction,
  addListItemAction,
  delListItemAction,
} from '../store/actionCreators';
const ReactReduxUI =(props) => {
    return (
      <div>
        <div>
          <input
            value={props.inputValue}
            onChange={props.inputChange}
          />
          <button onClick={props.clickButton}>提交</button>
        </div>
        <ul>
          {props.list.map((item, index) => {
            return (
              <li
                key={index + item}
                onClick={() => {
                  props.delItem(index);
                }}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    );
}

// 映射关系
const stateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    list: state.list,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    inputChange(e) {
      let action = changeInputAction(e.target.value);
      dispatch(action);
    },
    clickButton() {
      let action = addListItemAction();
      dispatch(action);
    },
    delItem(index) {
      let action = delListItemAction(index);
      dispatch(action);
    },
  };
};

// connect的作用是把UI组件（无状态组件）和业务逻辑代码的分开，然后通过connect再链接到一起，
// 让代码更加清晰和易于维护。这也是React-Redux最大的优点。
export default connect(stateToProps, dispatchToProps)(ReactReduxUI);
