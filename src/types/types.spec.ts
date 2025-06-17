import { BitSet } from "./index";

describe("Types", () => {
    describe("BitSet", () => {
        it("should return 0", () => {
            const bitset = new BitSet()
            expect(bitset.value).toBe(0)
        })
        it("should return 1", () => {
            const bitset = new BitSet([true])
            expect(bitset.value).toBe(1)
        });
        it("should return 1 too", () => {
            const bitset = new BitSet([true, false, false, false])
            expect(bitset.value).toBe(1)
        });
        it("should return 2", () => {
            const bitset = new BitSet().set(1, true)
            expect(bitset.value).toBe(2)
        });
        it("should return 10", () => {
            const bitset = new BitSet().set(1, true).set(3, true)
            expect(bitset.value).toBe(10)
        });
        it("should return true", () => {
            const bitset = new BitSet().set(1, true).set(3, true)
            expect(bitset.get(3)).toBe(true)
        });
        it("should throw an error", () => {
            const bitset = new BitSet().set(1, true).set(3, true)
            expect(() => bitset.get(4)).toThrow()
        });
    })
})