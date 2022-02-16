// 值为函数的选项，如created，mounted等，会直接合并，并且Mixins中钩子函数的执行要早于组件内

// 值为对象的选项，如methods，会进行合并，但如果方法名冲突，组件内方法将覆盖Mixins中的方法

// Mixins方法和参数在组件间不共享
export default {
    data() {
        return {
            message: '456'
        };
    }
};