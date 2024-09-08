import { sum } from '../../src/jest-examples';

describe('Jest is fine', () => {

  test('expect(...).toBeTruthy()', () => {
    expect(1).toBeTruthy();
  });

  test('example function sum', () => {
    expect(sum(1, 2)).toBe(3);
  });

});
