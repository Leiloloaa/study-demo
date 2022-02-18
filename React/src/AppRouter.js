import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Index from './pages/Index';
import List from './pages/List';
import Home from './pages/Home';
// 无状态组件
// function Index() {
//   return <h2>我是 Index </h2>;
// }

// 自己定义的组件一定要注意 大写字母开头 js是区分大小写的 另外jsx只有遇到大写字母开头的组件才会认为是自定义组件
// function List() {
//   return <h2>我是 List </h2>;
// }

// 重定向 在需重定向的页面
// 标签式重定向:就是利用<Redirect>标签来进行重定向，业务逻辑不复杂时建议使用这种。
// this.props.history.push('/home/');
// 编程式重定向:这种是利用编程的方式，一般用于业务逻辑当中，比如登录成功挑战到会员中心页面。
// <Redirect to="/home/" />;

function AppRouter() {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/">首页</Link>
        </li>
        <li>
          <Link to="/list/123">列表</Link>
        </li>
      </ul>
      {/* exact：精确匹配 一定是 / 才会匹配 不能是 /123 之类 */}
      <Route path="/" exact component={Index}></Route>
      <Route path="/list/:id" component={List}></Route>
      <Route path="/home/" component={Home} />
    </Router>
  );
}

export default AppRouter;
