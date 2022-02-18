import { createStore , applyMiddleware , compose   } from 'redux' // 引入createStore方法 applyMiddleware 是说明支持中间件
// compose 是让我们支持插件的同时 引入中间件 createStore 方法只有两个参数
// store 只是一个仓库，它并没有管理能力，它会把接收到的 action 自动转发给 Reducer。
import thunk from 'redux-thunk' // redux-thunk 是 redux 的中间件
import reducer from './reducer' // 引入 reducer
const composeEnhancers =   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}):compose
const enhancer = composeEnhancers(applyMiddleware(thunk))
const store = createStore(reducer, enhancer) // 创建数据存储仓库
// const store = createStore(reducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) // 创建数据存储仓库
export default store  //暴露出去