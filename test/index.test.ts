import {add, subtract} from "../src";

describe("测试集合", () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(add(1, 2)).toBe(3);
    });

    test('subtracts 4 -1 to equal 3', () => {
        expect(subtract(4, 1)).toBe(3);
    });
});