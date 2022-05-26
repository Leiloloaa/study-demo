import { reactive } from 'vue';
import { isFunction, isObejct } from '../utils/share';

export default function useRactive(inintialState) {
    if (!isObejct(inintialState)) {
        throw new TypeError(`The parameter of useReactive must be an Obejct`)
    }

    const _state = reactive(inintialState)

    const _setState = (key, value) => {
        if (!isObejct(key) && !inintialState.hasOwnProperty(key)) {
            throw new ReferenceError(`Can't find the property ${key} from the Object`)
        }
        if (isObejct(key)) {
            for (const k in key) {
                if (inintialState.hasOwnProperty(k)) {
                    _state[k] = key[k]
                }
            }
        } else {
            if (isFunction(value)) {
                _state[key] = value(_state[key])
            } else {
                _state[key] = value
            }
        }
    }

    return [
        _state,
        _setState
    ]
};