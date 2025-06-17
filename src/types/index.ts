export class BitSet {
    constructor(value?: number | boolean[]) {
        if (value) {
            if (typeof value == "number")
                this.value = value;
            else {
                let bin = ""
                for (const i of value) {
                    bin += i ? "1" : "0"
                }
                this.value = parseInt(bin.split("").reverse().join(""), 2)
            }
        }
        else
            this.value = 0
    }

    public readonly value: number

    private _getArray(): boolean[] {
        const bin = (this.value >>> 0).toString(2)
        let result: boolean[] = []
        for (const i of bin) {
            result.push(i == "1")
        }
        return result.reverse()
    }

    set(index: number, value: boolean): BitSet {
        const array = this._getArray()
        while (array.length <= index)
            array.push(false)
        array[index] = value
        return new BitSet(array)
    }

    get(index: number): boolean {
        const array = this._getArray()
        if (index < array.length)
            return array[index]
        else
            throw new RangeError(`Trying to get at index ${index} while BitSet contains only ${array.length} values`)
    }
}
