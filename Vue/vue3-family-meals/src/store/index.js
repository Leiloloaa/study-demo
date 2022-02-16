// import { createStore } from 'vuex';
import { createStore } from './mini-vuex';

// 数据流都试不允许直接修改的
// 需要提交一个 mutations 修改 state 中的数据
// 这样做的好处就是清楚的知道来源 是谁修改了
export default createStore({
    state: {
        count: 666
    },
    getters: {
        double(state) {
            return state.count * 2;
        }
    },
    // mutation 的设计就是用来实现同步地修改数据
    mutations: {
        add(state) {
            state.count = state.count + 1;
        }
    },
    // actions 是实现异步处理
    // action 并不是直接修改数据，而是通过 mutations 去修改
    actions: {
        asyncAdd({ commit }) {
            setTimeout(() => {
                commit('add');
            }, 1000);
        }
    }
});