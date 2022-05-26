import useState from './useState';
import { isObejct } from '../utils/share';
export default function useReducer(reducer, inintialState) {
    const [_state, _setState] = useState(inintialState)
    const dispatch = (action) => {
        // 首先这个 action 必须是一个对象 { type:xxx,payload:xxx}
        if (!isObejct(action)) {
            throw new TypeError(`The parameter 'action' must be the type 'object'`)
        }

        // 如果 action 不包含 type 也需要报错
        if (!action.hasOwnProperty('type')) {
            throw new ReferenceError(`the parameter 'action' need a property 'type'`)
        }
        reducer(_state, _setState, action)
    }
    return [
        _state,
        dispatch
    ]
};