// 写Redux Action的时候，我们写了很多Action的派发，产生了很多Action Types，
// 如果需要Action的地方我们就自己命名一个Type,会出现两个基本问题：

// 这些Types如果不统一管理，不利于大型项目的服用，设置会长生冗余代码。
// 因为Action里的Type，一定要和Reducer里的type一一对应在，
// 所以这部分代码或字母写错后，浏览器里并没有明确的报错，这给调试带来了极大的困难。

export const CHANGE_INPUT = 'changeInput' // 全部大写 就意味着它是常量
export const ADD_LIST_ITEM = 'addListItem'
export const DEL_LIST_ITEM = 'delListItem'
export const GET_LIST = 'getList'