import React from 'react'; // imr
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './index.css';
import Index from './pages2/Index';
import Videos from './pages2/Videos';
import Workplace from './pages2/Workplace';
function AppRouter() {
  let routeConfig = [
    { path: '/', title: '博客首页', exact: true, component: Index },
    { path: '/videos/', title: '视频教程', exact: false, component: Videos },
    {
      path: '/workplace/',
      title: '职场技能',
      exact: false,
      component: Workplace,
    },
  ];
  return (
    <Router>
      <div className="mainDiv">
        <div className="leftNav">
          <h3>一级导航</h3>
          <ul>
            {/* 切记：一定要在js代码外面包裹一层{} */}
            {routeConfig.map((item, index) => {
              return (
                <li>
                  <Link to={item.path}>{item.title}</Link>
                </li>
              );
            })}
          </ul>
          {/* <ul>
            <li>
              <Link to="/">博客首页</Link>
            </li>
            <li>
              <Link to="/videos/">视频教程</Link>
            </li>
            <li>
              <Link to="/workplace/">职场技能</Link>
            </li>
          </ul> */}
        </div>
        <div className="rightMain">
          {routeConfig.map((item, index) => {
            return (
              <Route
                path={item.path}
                exact={item.exact}
                component={item.component}
              ></Route>
            );
          })}
          {/* <Route path="/" exact component={Index}></Route>
          <Route path="/videos/" component={Videos}></Route>
          <Route path="/workplace/" component={Workplace}></Route> */}
        </div>
      </div>
    </Router>
  );
}

export default AppRouter;
