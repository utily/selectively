import * as selectively from "../index"
import { Completion } from "./Completion"

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
const testObject = selectively.Type.convert(testing)

describe("selectively.Type", () => {
	it("complete", () => {
		expect(Completion.stringify(testObject.complete(""))).toEqual(["merchant_", "authorization_", "!_"])
		expect(Completion.stringify(testObject.complete("merc"))).toEqual(["merchant_"])
		expect(Completion.stringify(testObject.complete("merchant"))).toEqual(["merchant._", "merchant:_"])
		expect(Completion.stringify(testObject.complete("merchant:"))).toEqual(["merchant:has(_)"])
		expect(Completion.stringify(testObject.complete("merchant."))).toEqual([
			"merchant.name_",
			"merchant.descriptor_",
			"merchant.country_",
			"merchant.currency_",
			"merchant.captured_",
			"merchant.fees_",
			"merchant.refundable_",
			"merchant.settled_",
			"merchant.scheme_",
		])
		expect(Completion.stringify(testObject.complete("merchant.name"))).toEqual([
			"merchant.name:_",
			"merchant.name>_",
			"merchant.name>=_",
			"merchant.name<_",
			"merchant.name<=_",
		])
		expect(Completion.stringify(testObject.complete("merchant.name:"))).toEqual([
			"merchant.name:Example AB_",
			"merchant.name:*_",
			"merchant.name:*_*",
			"merchant.name:/_/",
			"merchant.name:!_",
			"merchant.name:within(_)",
			"merchant.name:_*",
		])
	})

	it("right hand side test with string on left hand", () => {
		expect(Completion.stringify(testObject.complete("!"))).toEqual(["!merchant_", "!authorization_"])
		expect(Completion.stringify(testObject.complete("merchant.name>"))).toEqual([
			"merchant.name>merchant._",
			"merchant.name>authorization._",
			"merchant.name>!_",
			"merchant.name>=_",
		])
		expect(testObject).toEqual(testObject)
		expect(Completion.stringify(testObject.complete("merchant.name>authorization."))).toEqual([
			"merchant.name>authorization.currency_",
			"merchant.name>authorization.card._",
			"merchant.name>authorization.capture_",
			"merchant.name>authorization.descriptor_",
			"merchant.name>authorization.recurring_",
			"merchant.name>authorization.verification_",
		])
		expect(Completion.stringify(testObject.complete("merchant.name>authorization.car"))).toEqual([
			"merchant.name>authorization.card._",
		])
		expect(Completion.stringify(testObject.complete("merchant.name>authorization.card."))).toEqual([
			"merchant.name>authorization.card.iin_",
			"merchant.name>authorization.card.last4_",
			"merchant.name>authorization.card.scheme_",
			"merchant.name>authorization.card.csc_",
			"merchant.name>authorization.card.type_",
		])
	})
	it("right hand side test with number on left hand", () => {
		expect(Completion.stringify(testObject.complete("merchant.captured:"))).toEqual([
			"merchant.captured:merchant._",
			"merchant.captured:authorization._",
			"merchant.captured:!_",
			"merchant.captured:within(_)",
		])
		expect(Completion.stringify(testObject.complete("merchant.captured"))).toEqual([
			"merchant.captured>_",
			"merchant.captured>=_",
			"merchant.captured<_",
			"merchant.captured<=_",
			"merchant.captured:_",
		])
		expect(Completion.stringify(testObject.complete("merchant.captured>"))).toEqual([
			"merchant.captured>merchant._",
			"merchant.captured>authorization._",
			"merchant.captured>=_",
		])
		expect(Completion.stringify(testObject.complete("merchant.captured>auth"))).toEqual([
			"merchant.captured>authorization._",
		])
		expect(Completion.stringify(testObject.complete("merchant.captured>authorization."))).toEqual([
			"merchant.captured>authorization.amount_",
		])
		expect(Completion.stringify(testObject.complete("merchant.captured>authorization.amount"))).toEqual([
			"merchant.captured>authorization.amount merchant_",
			"merchant.captured>authorization.amount authorization_",
			"merchant.captured>authorization.amount !_",
			"merchant.captured>authorization.amount | _",
			"merchant.captured>authorization.amount + _",
			"merchant.captured>authorization.amount - _",
			"merchant.captured>authorization.amount * _",
		])
		expect(Completion.stringify(testObject.complete("merchant.captured>authorization.amount + "))).toEqual([
			"merchant.captured>authorization.amount + merchant._",
			"merchant.captured>authorization.amount + authorization._",
		])
		expect(Completion.stringify(testObject.complete("merchant.captured>authorization.amount-"))).toEqual([
			"merchant.captured>authorization.amount - _",
		])
	})
	it("And and Or completion test", () => {
		expect(Completion.stringify(testObject.complete("merchant.captured>authorization.amount"))).toEqual([
			"merchant.captured>authorization.amount merchant_",
			"merchant.captured>authorization.amount authorization_",
			"merchant.captured>authorization.amount !_",
			"merchant.captured>authorization.amount | _",
			"merchant.captured>authorization.amount + _",
			"merchant.captured>authorization.amount - _",
			"merchant.captured>authorization.amount * _",
		])
		expect(Completion.stringify(testObject.complete("merchant.captured>authorization.amount|"))).toEqual([
			"merchant.captured>authorization.amount | _",
		])
		expect(Completion.stringify(testObject.complete("merchant.captured>authorization.amount | merchant."))).toEqual([
			"merchant.captured>authorization.amount | merchant.name_",
			"merchant.captured>authorization.amount | merchant.descriptor_",
			"merchant.captured>authorization.amount | merchant.country_",
			"merchant.captured>authorization.amount | merchant.currency_",
			"merchant.captured>authorization.amount | merchant.captured_",
			"merchant.captured>authorization.amount | merchant.fees_",
			"merchant.captured>authorization.amount | merchant.refundable_",
			"merchant.captured>authorization.amount | merchant.settled_",
			"merchant.captured>authorization.amount | merchant.scheme_",
		])
	})
})
