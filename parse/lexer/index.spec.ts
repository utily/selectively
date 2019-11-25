import { tokenize } from "./index"

function t(data: string): string[] {
	return tokenize(data).map(item => item.value).filter(item => item != undefined).toArray() as string[]
}

describe("parser.tokenize", () => {
	it("test", () => expect(t("test")).toMatchObject(["test"]))
	it("test*", () => expect(t("test*")).toEqual(["test", "*"]))
	it("*test*", () => expect(t("*test*")).toEqual(["*", "test", "*"]))
	it("nested.property:*test*", () => expect(t("nested.property:*test*")).toEqual(["nested", ".", "property", ":", "*", "test", "*"]))
})
