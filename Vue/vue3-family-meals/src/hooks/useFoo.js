export function useFoo() {
    let message = '我是 useFoo 中的 message';

    function test() {
        console.log('useFoo 的 test');
    }
    return {
        message,
        test
    };
}