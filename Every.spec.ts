import * as selectively from "./index"

describe("every", () => {
	it("simple", () => expect(selectively.is({ status: selectively.every(selectively.endsWith("ed")) }, { id: "axb", status: ["denied", "approved"] })).toBeTruthy())
	it("negative", () => expect(selectively.is({ status: selectively.every(selectively.endsWith("ied")) }, { id: "axb", status: ["denied", "approved"] })).toBeFalsy())
})
