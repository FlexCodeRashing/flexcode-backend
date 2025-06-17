import { BitSet } from "../types";

export enum Permission {
    ADMIN,
    MODERATOR
}

export class Permissions {
    constructor(value?: number | BitSet) {
        if (value) {
            if (typeof value == "number") this.bitSet = new BitSet(value);
            else this.bitSet = value;
        } else this.bitSet = new BitSet();
    }

    private readonly bitSet: BitSet;

    public getValue() {
        return this.bitSet.value;
    }
    public get(permission: Permission): boolean {
        try {
            return this.bitSet.get(permission);
        } catch {
            return false;
        }
    }
    public set(permission: Permission, value: boolean): Permissions {
        return new Permissions(this.bitSet.set(permission, value));
    }

    public can(required: Permissions): boolean {
        let a = this.bitSet.value;
        let b = required.bitSet.value;

        while (a > 0 || b > 0) {
            const bitA = a & (1 << 0);
            const bitB = b & (1 << 0);
            if (!(!bitB || bitA)) {
                return false;
            }
            a >>= 1;
            b >>= 1;
        }
        return true;
    }
}
