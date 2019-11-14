import * as selectively from "./index"

describe("toString", () => {
	it("any", () => expect(selectively.any("any").toString()).toEqual("any"))
	it("any p:test", () => expect(selectively.and(selectively.any("any"), { p: "test" }).toString()).toEqual("any p:test"))
	it("any | p:test", () => expect(selectively.or(selectively.any("any"), { p: "test" }).toString()).toEqual("any | p:test"))
	it("(any | 12) p:test", () => expect(selectively.and(selectively.or("any", 12), { p: "test" }).toString()).toEqual("(any | 12) p:test"))
	it("p:test p2:12", () => expect(selectively.create({ p: "test", p2: 12 }).toString()).toEqual("p:test p2:12"))
	it("status:some(ready)", () => expect(selectively.create({ status: selectively.some("ready") }).toString()).toEqual("status:some(ready)"))
	it("[class:!test, 1337]", () => expect(selectively.create([{ class: selectively.not("test") }, 1337]).toString()).toEqual("[class:!test, 1337]"))
})
