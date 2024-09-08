import { effect, reactive } from '../../../src/reactivity/ex3';

describe('reactivity', () => {
  describe('basic', () => {
    test('basic', () => {
      let currentUserName;
      const data = { id: 10, name: 'John'};
      const ref = reactive(data);
      effect(() => {
        currentUserName = ref.name;
      });
      expect(data.name).toEqual('John')

      ref.name = 'Mike';
      expect(data.name).toEqual('Mike');

      // ref.name = 'Lyn';

      // console.log('Finally, data = ', data);
    })
  });
});
