import * as selectively from "../index"
import { Token } from "../lexer"
import { tokenize } from "../lexer"

function t(data: string): Token[] {
	return tokenize("." + data)
		.map(t => ({ value: t.value }))
		.toArray()
}
describe("selectively.Type", () => {
	it("Tokenizer", () => {
		expect(t("object.has()")).toMatchSnapshot()
		expect(t("if")).toMatchSnapshot()
	})

	it("Object", () => {
		const type = new selectively.Type.Object({ name: new selectively.Type.String() })
		expect(type).toMatchSnapshot()
	})
	it("Array", () => {
		const testArray: selectively.Type.Array = new selectively.Type.Array(new selectively.Type.String())
		expect(testArray.complete(t("ev"))).toMatchSnapshot()
		expect(testArray.complete(t(""))).toMatchSnapshot()
	})
	it("Boolean", () => {
		const testBoolean: selectively.Type.Boolean = new selectively.Type.Boolean()
		expect(testBoolean).toMatchSnapshot()
		expect(testBoolean.complete(t("tr"))).toMatchSnapshot()
		expect(testBoolean.complete(t(""))).toMatchSnapshot()
	})

	it("complete", () => {
		const object = new selectively.Type.Object({
			id: new selectively.Type.Object({ first: new selectively.Type.String(), second: new selectively.Type.String() }),
			status: new selectively.Type.Object({
				statusArray: new selectively.Type.Array(new selectively.Type.String()),
				statusString: new selectively.Type.String(),
			}),
		})

		expect(object).toMatchSnapshot()
		// const options = type.complete(t("h"))
		// expect(options).toEqual([{ value: "has()", cursor: 4 }])

		// expect(object.complete(t(""))).toMatchSnapshot() // = object.
		expect(object.complete(t("has()"))).toMatchSnapshot()
		expect(object.complete(t("has(i)"))).toMatchSnapshot()
		expect(object.complete(t("has("))).toMatchSnapshot()
		expect(object.complete(t("has(id"))).toMatchSnapshot()
		expect(object.complete(t("status."))).toMatchSnapshot()
		expect(object.complete(t("status.statusArray"))).toMatchSnapshot()
		expect(object.complete(t("status.statusArray."))).toMatchSnapshot()
		expect(object.complete(t("status.statusArray.eve"))).toMatchSnapshot()
		expect(object.complete(t("id."))).toMatchSnapshot()
		expect(object.complete(t("id.fir"))).toMatchSnapshot()
		expect(object.complete(t("id.first"))).toMatchSnapshot()
		expect(object.complete(t("id.first."))).toMatchSnapshot()
		expect(object.complete(t("id.first.every()"))).toMatchSnapshot()
		expect(object.complete(t("id.first<"))).toMatchSnapshot()
		expect(object.complete(t("id.first<="))).toMatchSnapshot()
		expect(object.complete(t("id.has"))).toMatchSnapshot() //id, ., has => id.has()
		expect(object.complete(t("id.has("))).toMatchSnapshot() //id, ., has( => id.has()
		expect(object.complete(t("id.has().prop"))).toMatchSnapshot() //id, . , has, (, ) || id.has(first || second)
	})
})
