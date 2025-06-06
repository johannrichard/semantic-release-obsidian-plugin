import { it, expect, describe } from "vitest";

import { everyPromise } from "./every-promise.js";

describe(`${everyPromise.name}`, () => {
    it("returns array of values when all promises resolve", async () => {
        const promises = [1, 2, 3, 4, 5].map((i) => Promise.resolve(i));

        await expect(everyPromise(promises)).resolves.toEqual([1, 2, 3, 4, 5]);
    });

    it("throws if any promise rejects", async () => {
        const promises = [Promise.resolve(1), Promise.reject(new Error("Rejected")), Promise.resolve(3)];

        await expect(everyPromise(promises)).rejects.toThrowError();
    });

    it("creates an aggregate error message", async () => {
        const promises = [
            Promise.reject(new Error("Uh-oh!")),
            Promise.reject(
                new Error(`\
Ugh!
A really long
	multi-
line message..!`),
            ),
        ];

        await expect(everyPromise(promises)).rejects.toThrowError(
            `\
-	Uh-oh!
-	Ugh!
	A really long
		multi-
	line message..!`,
        );
    });

    it("prepends aggregate error message with input message", async () => {
        const promises = [
            Promise.reject(new Error("Uh-oh!")),
            Promise.reject(
                new Error(`\
Ugh!
A really long
	multi-
line message..!`),
            ),
        ];

        await expect(everyPromise(promises, "oh man!")).rejects.toThrowError(
            `\
oh man!
-	Uh-oh!
-	Ugh!
	A really long
		multi-
	line message..!`,
        );
    });
});
