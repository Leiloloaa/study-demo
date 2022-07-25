import { effect } from "../effect";
import { reactive } from "../reactive";

describe('effect', () => {
  it('reactive base', () => {
    // reactive 核心
    // get 收集依赖
    // set 触发依赖
    const user = reactive({
      name:'zs',
      age: 10
    })

    let nextAge
    effect(() => {
      nextAge = user.age + 1
    })
    expect(nextAge).toBe(11)

    // update
    user.age++  // user.age = user.age + 1
    expect(nextAge).toBe(12)
  });
});