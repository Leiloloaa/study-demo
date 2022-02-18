// 这是 todolist 的 ui 组件
import React from 'react';
import 'antd/dist/antd.css';
import { Input, Button, List } from 'antd';

// UI 组件 我们将它封装成 无状态组件
// 一定想着组件是否可以作成无状态组件，如果能做成无状态组件就尽量作成无状态组件，毕竟性能要高很多。
const AntTodolistUI = (props) => {
    return (
      <div style={{ margin: '10px' }}>
        <div>
          <Input
            style={{ width: '250px', marginRight: '10px' }}
            onChange={props.onChangeInputValue}
            value={props.inputValue}
          />
          <Button type="primary" shape="round" onClick={props.addListItem}>
            增加
          </Button>
        </div>
        <div style={{ margin: '10px', width: '300px' }}>
          <List
            bordered
            dataSource={props.list}
            renderItem={(item, index) => (
              <List.Item onClick={()=>{props.delItem(index)}}>
                {item}
              </List.Item>
            )}
          />
        </div>
      </div>
    );
}
 
export default AntTodolistUI;