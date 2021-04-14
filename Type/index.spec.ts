import * as selectively from "../index"
import { Token } from "../lexer"
import { tokenize } from "../lexer"
import { Completion } from "./Completion"

function t(data: string): Token[] {
	return tokenize(data)
		.map(t => ({ value: t.value }))
		.toArray()
}
describe("selectively.Type", () => {
	it("Tokenizer", () => {
		expect(t("")).toEqual([])
	})
	it("complete", () => {
		const object = new selectively.Type.Object({
			id: new selectively.Type.Object({
				first: new selectively.Type.Object({ value: new selectively.Type.String("test") }),
				second: new selectively.Type.Number(),
			}),
			status: new selectively.Type.Object({
				statusArray: new selectively.Type.Array([
					new selectively.Type.String("t"),
					new selectively.Type.String("best"),
					new selectively.Type.String("test"),
					new selectively.Type.String("ted"),
					new selectively.Type.String("tested"),
				]),
				statusArray2: new selectively.Type.Array([
					new selectively.Type.Number(1),
					new selectively.Type.Number(2),
					new selectively.Type.Number(3),
					new selectively.Type.Number(3),
					new selectively.Type.Number(4),
				]),
			}),
			kaktus: new selectively.Type.String(),
		})
		expect(Completion.stringify(object.complete(t("")))).toEqual(["id|", "status|", "kaktus|"])
		expect(Completion.stringify(object.complete(t("i")))).toEqual(["id|"])
		expect(Completion.stringify(object.complete(t("id")))).toEqual(["id.|", "id:|"])
		expect(Completion.stringify(object.complete(t("id.")))).toEqual(["id.first|", "id.second|"])
		expect(Completion.stringify(object.complete(t("id.first")))).toEqual(["id.first.|", "id.first:|"])
		expect(Completion.stringify(object.complete(t("id.first.")))).toEqual(["id.first.value|"])
		expect(Completion.stringify(object.complete(t("id.first:")))).toEqual(["id.first:has(|)", "id.first:!|"])
		expect(Completion.stringify(object.complete(t("id:")))).toEqual(["id:has(|)", "id:!|"])
		expect(Completion.stringify(object.complete(t("id:ha")))).toEqual(["id:has(|)"])
		expect(Completion.stringify(object.complete(t("id:has()")))).toEqual(["id:has(first|)", "id:has(second|)"])
		expect(Completion.stringify(object.complete(t("id.first.value")))).toEqual(["id.first.value:|"])
	})
})
