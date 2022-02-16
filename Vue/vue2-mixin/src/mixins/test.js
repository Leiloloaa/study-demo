// 值为函数的选项，如created，mounted等，会直接合并，并且Mixins中钩子函数的执行要早于组件内

// 值为对象的选项，如methods，会进行合并，但如果方法名冲突，组件内方法将覆盖Mixins中的方法

// Mixins方法和参数在组件间不共享

// 使用mixin最头痛的莫过于命名问题，如果一段逻辑不能在多个组件之中进行复用，那么也就没有提取的必要，但恰恰是多个组件的复用就会有命名问题，我们知道混入规则中，如果值为对象的选项，命名冲突时组件内方法将会覆盖混入方法，这使得我们在多个组件复用时，编写代码更为困难，同时如果一旦改动mixin中的代码，那么引用并混入的所有组件都会受到影响，可谓牵一发而动全身

export default {
    data() {
        return {
            message: 'mixin-message'
        };
    },
    created() {
        // this.mixinTest();
        console.log('这是从mix页面输出');
    },
    mounted() {
        console.log('这是从mix页面mounted输出');
    },
    methods: {
        mixinTest() {
            console.log('mixin');
        }
    }
};