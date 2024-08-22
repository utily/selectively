import { isly } from "isly"
import * as selectively from "../index"
import { Completion } from "./Completion"

interface TestObject {
	amount: number
	currency: string
	approved?: boolean
}
const testObjectType = isly.object<TestObject>({
	amount: isly.number(),
	currency: isly.string(["SEK", "EUR"]),
	approved: isly.boolean().optional(),
})
const transformer = new selectively.Type.Transformer()
const transformed = transformer.transform(testObjectType)
describe("Transform", () => {
	it("Complete", () => {
		expect(transformed?.complete("")).toEqual([
			{ suggestion: { value: "amount" }, value: "amount" },
			{ suggestion: { value: "currency" }, value: "currency" },
			{ suggestion: { value: "approved" }, value: "approved" },
			{ cursor: 1, suggestion: { description: "not", value: "!" }, value: "!" },
		])
		expect(Completion.stringify(transformed?.complete("") ?? [])).toEqual(["amount_", "currency_", "approved_", "!_"])
		expect(Completion.stringify(transformed?.complete("!") ?? [])).toEqual(["!amount_", "!currency_", "!approved_"])
		expect(Completion.stringify(transformed?.complete("amo") ?? [])).toEqual(["amount_"])
		expect(Completion.stringify(transformed?.complete("amount") ?? [])).toEqual([
			"amount>_",
			"amount>=_",
			"amount<_",
			"amount<=_",
			"amount:_",
		])
		expect(Completion.stringify(transformed?.complete("currency") ?? [])).toEqual([
			"currency:_",
			"currency>_",
			"currency>=_",
			"currency<_",
			"currency<=_",
		])
		expect(Completion.stringify(transformed?.complete("currency:") ?? [])).toEqual([
			"currency:SEK_",
			"currency:*_",
			"currency:*_*",
			"currency:/_/",
			"currency:!_",
			"currency:within(_)",
			"currency:_*",
			"currency:EUR_",
		])
	})
})
