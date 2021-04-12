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
		const testing = {
			merchant: {
				name: "Example AB",
				descriptor: "Example Company",
				country: "SE",
				currency: "SEK",
				captured: 1000,
				fees: 1000,
				refundable: 1000,
				settled: 1000,
				scheme: ["visa", "mastercard"],
			},
			authorization: {
				amount: 10,
				currency: "SEK",
				card: {
					iin: "411111",
					last4: "1111",
					scheme: "visa",
					csc: "present",
					type: "debit",
				},
				capture: "auto",
				descriptor: "Example AB",
				recurring: "initial",
				verification: "rejected",
			},
		}
		const output = selectively.Type.convert(testing)

		expect(Completion.stringify(output.complete(t("")))).toEqual(["merchant|", "authorization|"])
		expect(Completion.stringify(output.complete(t("merc")))).toEqual(["merchant|"])
		expect(Completion.stringify(output.complete(t("merchant")))).toEqual(["merchant.|", "merchant:|"])
		expect(Completion.stringify(output.complete(t("merchant.")))).toEqual([
			"merchant.name|",
			"merchant.descriptor|",
			"merchant.country|",
			"merchant.currency|",
			"merchant.captured|",
			"merchant.fees|",
			"merchant.refundable|",
			"merchant.settled|",
			"merchant.scheme|",
		])
		expect(Completion.stringify(output.complete(t("merchant.name")))).toEqual([
			"merchant.name:|",
			"merchant.name>|",
			"merchant.name>=|",
			"merchant.name<|",
			"merchant.name<=|",
		])
		expect(Completion.stringify(output.complete(t("merchant.name:")))).toEqual([
			"merchant.name:*|",
			"merchant.name:*|*",
			"merchant.name:/|/",
			"merchant.name:!|",
			"merchant.name:|*",
		])
	})
})
