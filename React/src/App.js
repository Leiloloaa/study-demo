import './App.css';
import React from 'react';
// import ToDoList from './component/todolist';
import AntTodolist from './component/AntTodolist';
import HookTest from './component/HookTest';
import Index from './colorBtn/Index';
// import AppRouter from './AppRouter2';
import ReactRedux from './component/ReactRedux';
import { Provider } from 'react-redux';
import store from './store/index';

function App() {
  return (
      <HookTest />
  );
}

export default App;
