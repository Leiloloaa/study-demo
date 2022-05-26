import { ref } from 'vue';
import { isFunction } from '../utils/share';

const states = [],
    stateSetters = []
let stateIndex = 0 // 公共下标 要知道从哪个位置开始设置

function createState(initialState, stateIndex) {
    // 首先是创建 ref 变量
    const state = ref(initialState)

    // 这里不能直接判断 !states[stateIndex] 因为可能存在 0 的情况
    // 如果数组的这个位置为 undefined，那么就返回 state 作为初始值，否则就返回这个 states[stateIndex] 的值
    return states[stateIndex] !== undefined ? states[stateIndex] : state
}

// 因为 setState 需要去放回一个函数 所以这里需要一个创建函数去返回一个函数
function createStateSetters(stateIndex) {
    return function(newState) {
        // setState 可以是两种形式 一种是函数 另一是直接修改值
        if (isFunction(newState)) {
            // ref 值 所以要用 .value
            states[stateIndex].value = newState(states[stateIndex])
        } else {
            states[stateIndex].value = newState
        }
    }
}

export default function useState(initialState, setState) {
    states[stateIndex] = createState(initialState, stateIndex)

    // stateSetters[stateIndex] 不存在的情况 才会去 push
    !stateSetters[stateIndex] && stateSetters.push(createStateSetters(stateIndex))

    // 内部变量使用 _ 下划线区分
    const _state = states[stateIndex],
        _setState = stateSetters[stateIndex]
    stateIndex++
    return [
        _state,
        _setState
    ]
};