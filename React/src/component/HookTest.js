// import React ,{ Component } from 'react';
// class HookTest extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { count:0 }
//     this.addCount = this.addCount.bind(this)
//   }
//   render() {
//     return ( <div>{this.state.count}<button onClick={this.addCount}>点我加1</button></div> );
//   }
//   addCount(){
//     this.setState({ count: ++this.state.count });
//   }
// }

// export default HookTest;

import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useReducer
} from 'react';

const CountContext = createContext();

function Counter() {
  const count1 = useContext(CountContext); //一句话就可以得到count
  return (
    <h2>
      {count1}
    </h2>
  );
}

function HookTest() {
  const [count, setCount] = useState(0);
  const [age, setAge] = useState('18');
  const [name, setName] = useState('Lucy');

  const [count1, dispatch] = useReducer((state, action) => {
    switch (action) {
      case 'add':
        return state + 1;
      case 'sub':
        return state - 1;
      default:
        return state;
    }
  }, 0);
  // React 首次渲染和之后的每次渲染都会调用一遍 useEffect 函数，而之前我们要用两个生命周期函数分别表示首次渲染( componentDidMount )和更新导致的重新渲染( componentDidUpdate )。
  //useEffect 中定义的函数的执行不会阻碍浏览器更新视图，也就是说这些函数时异步执行的，而 componentDidMount 和 componentDidUpdate 中的代码都是同步执行的。
  // useEffect(() => {
  //   console.log(123);
  // });

  // componentWillUnmount 生命周期函数（组件将要被卸载时执行）。比如我们的定时器要清空，避免发生内存泄漏;比如登录状态要取消掉，避免下次进入信息出错。componentWillUnmount -解绑副作用
  // useEffect 的第二个参数
  // useEffect 的第二个参数，它是一个数组，数组中可以写入很多状态对应的变量，意思是当状态值发生变化时，我们才进行解绑。但是当传空数组[]时，就是当组件将被销毁时才进行解绑，这也就实现了 componentWillUnmount 的生命周期函数。
  // 但是如果我们想每次 count 发生变化，我们都进行解绑，只需要在第二个参数的数组里加入 count 变量就可以了。
  // useEffect(() => {
  //   console.log('++++');
  // }, [count]);

  // useContext 跨越组件层级直接传递变量，实现共享。需要注意的是 useContext 和 redux 的作用是不同的，一个解决的是组件之间值传递的问题，一个是应用中统一管理状态的问题，但通过和 useReducer 的配合使用，可以实现类似 Redux 的作用。

  // 1、创建一个 createContext
  // const CountContext = createContext()

  return (
    <div>
      {/* 2、 创建一个上下文变量 */}
      <CountContext.Provider value={count1}>
        <Counter />
      </CountContext.Provider>
      {/* {count} */}
      <button
        onClick={() => {
          dispatch('add');
        }}
      >
        点我加1
      </button>{' '}
      <button
        onClick={() => {
          dispatch('sub');
        }}
      >
        点我减1
      </button>
      <p>{name}</p>
      <p>{age}</p>
    </div>
  );
}

const Child = ({ data }) => {
  console.log('child render...', data); // 每次更新都会执行
  const [name, setName] = useState(data); // 只会在首次渲染组件时执行
  return (
    <div>
      <div>child</div>
      <div>
        {name} --- {data}
      </div>
    </div>
  );
};

const Hook = () => {
  console.log('Hook render...');
  const [name, setName] = useState('rose');
  return (
    <div>
      <button onClick={() => setName('jack')}>update name </button>
      <Child data={name} />
    </div>
  );
};

export default Hook;
