import { Permission, Permissions } from "./types";

describe("Auth types", () => {
    describe("Permissions", () => {
        it("should return 0", () => {
            expect(new Permissions().getValue()).toBe(0);
        });
        it("should return 1", () => {
            expect(
                new Permissions().set(Permission.ADMIN, true).getValue()
            ).toBe(1);
        });
        it("should return 2", () => {
            expect(
                new Permissions().set(Permission.MODERATOR, true).getValue()
            ).toBe(2);
        });
        it("should return 3", () => {
            expect(
                new Permissions()
                    .set(Permission.ADMIN, true)
                    .set(Permission.MODERATOR, true)
                    .getValue()
            ).toBe(3);
        });
        it("should return 2 too", () => {
            expect(
                new Permissions()
                    .set(Permission.ADMIN, true)
                    .set(Permission.MODERATOR, true)
                    .set(Permission.ADMIN, false)
                    .getValue()
            ).toBe(2);
        });
        it("should return true", () => {
            expect(
                new Permissions()
                    .set(Permission.MODERATOR, true)
                    .get(Permission.MODERATOR)
            ).toBe(true);
        });
        it("should return false", () => {
            expect(
                new Permissions()
                    .set(Permission.MODERATOR, true)
                    .get(Permission.ADMIN)
            ).toBe(false);
        });
        it("should return false too", () => {
            expect(
                new Permissions()
                    .set(Permission.ADMIN, true)
                    .get(Permission.MODERATOR)
            ).toBe(false);
        });
        it("should return true (can)", () => {
            const a = new Permissions(parseInt("10101", 2));
            const b = new Permissions(parseInt("00101", 2));
            expect(a.can(b)).toBe(true);
        });
        it("should return false (can)", () => {
            const a = new Permissions(parseInt("10101", 2));
            const b = new Permissions(parseInt("01101", 2));
            expect(a.can(b)).toBe(false);
        });
        it("should return true too (can)", () => {
            const a = new Permissions()
                .set(Permission.ADMIN, true)
                .set(Permission.MODERATOR, true);
            const b = new Permissions().set(Permission.MODERATOR, true);
            expect(a.can(b)).toBe(true);
        });
        it("should return false too (can)", () => {
            const a = new Permissions().set(Permission.MODERATOR, true);
            const b = new Permissions().set(Permission.ADMIN, true);
            expect(a.can(b)).toBe(false);
        });
        it("should return true (can 0)", () => {
            const a = new Permissions();
            const b = new Permissions();
            expect(a.can(b)).toBe(true);
        });
    });
});
