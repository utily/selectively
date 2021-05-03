import * as selectively from "../index"
import { Completion } from "./Completion"

const merchant = new selectively.Type.Object({
	id: new selectively.Type.String(),
	descriptor: new selectively.Type.String(),
	name: new selectively.Type.String(),
	currency: new selectively.Type.String("Currency"),
	scheme: new selectively.Type.Union([
		new selectively.Type.String("unknown"),
		new selectively.Type.String("amex"),
		new selectively.Type.String("dankort"),
		new selectively.Type.String("diners"),
		new selectively.Type.String("discover"),
		new selectively.Type.String("electron"),
		new selectively.Type.String("interpayment"),
		new selectively.Type.String("jcb"),
		new selectively.Type.String("maestro"),
		new selectively.Type.String("mastercard"),
		new selectively.Type.String("unionpay"),
		new selectively.Type.String("visa"),
	]),
	refundable: new selectively.Type.Number(),
	captured: new selectively.Type.Number(),
	settled: new selectively.Type.Number(),
	fees: new selectively.Type.Number(),
})

const Card = new selectively.Type.Object({
	scheme: new selectively.Type.Union([
		new selectively.Type.String("unknown"),
		new selectively.Type.String("amex"),
		new selectively.Type.String("dankort"),
		new selectively.Type.String("diners"),
		new selectively.Type.String("discover"),
		new selectively.Type.String("electron"),
		new selectively.Type.String("interpayment"),
		new selectively.Type.String("jcb"),
		new selectively.Type.String("maestro"),
		new selectively.Type.String("mastercard"),
		new selectively.Type.String("unionpay"),
		new selectively.Type.String("visa"),
	]),
	iin: new selectively.Type.String(),
	last4: new selectively.Type.String(),
	expires: new selectively.Type.String(),
	type: new selectively.Type.Union([new selectively.Type.String("debit"), new selectively.Type.String("credit")]),
	csc: new selectively.Type.Union([
		new selectively.Type.String("matched"),
		new selectively.Type.String("matched"),
		new selectively.Type.String("present"),
	]),
})

const template = new selectively.Type.Object({
	merchant: merchant,
	authorization: new selectively.Type.Object({
		id: new selectively.Type.String(),
		number: new selectively.Type.String(),
		reference: new selectively.Type.String(),
		amount: new selectively.Type.Number(),
		currency: new selectively.Type.Union([new selectively.Type.String("SEK"), new selectively.Type.String("EUR")]),
		card: Card,
		descriptor: new selectively.Type.String(),
		recurring: new selectively.Type.Union([
			new selectively.Type.String("initial"),
			new selectively.Type.String("subsequent"),
		]),
		verification: new selectively.Type.Union([
			new selectively.Type.String("verified"),
			new selectively.Type.String("unavailable"),
			new selectively.Type.String("rejected"),
		]),
		captured: new selectively.Type.Object({
			amount: new selectively.Type.Number(),
			latest: new selectively.Type.String(),
			auto: new selectively.Type.String(),
		}),
		refunded: new selectively.Type.Object({
			amount: new selectively.Type.Number(),
			latest: new selectively.Type.String(),
		}),
		settled: new selectively.Type.Object({
			gross: new selectively.Type.Number(),
			fee: new selectively.Type.Number(),
			net: new selectively.Type.Number(),
			latest: new selectively.Type.String(),
		}),
		voided: new selectively.Type.String(),
		status: new selectively.Type.Array([
			new selectively.Type.Union([
				new selectively.Type.String("authorized"),
				new selectively.Type.String("cancelled"),
				new selectively.Type.String("captured"),
				new selectively.Type.String("refunded"),
				new selectively.Type.String("settled"),
			]),
		]),
		created: new selectively.Type.String(),
	}),
})

describe("selectively.template", () => {
	it("template completions", () => {
		expect(Completion.stringify(template.complete(""))).toEqual(["merchant_", "authorization_", "!_"])
		expect(Completion.stringify(template.complete("autho"))).toEqual(["authorization_"])
		expect(Completion.stringify(template.complete("authorization"))).toEqual(["authorization._", "authorization:_"])
		expect(Completion.stringify(template.complete("authorization."))).toEqual([
			"authorization.id_",
			"authorization.number_",
			"authorization.reference_",
			"authorization.amount_",
			"authorization.currency_",
			"authorization.card_",
			"authorization.descriptor_",
			"authorization.recurring_",
			"authorization.verification_",
			"authorization.captured_",
			"authorization.refunded_",
			"authorization.settled_",
			"authorization.voided_",
			"authorization.status_",
			"authorization.created_",
		])
		expect(Completion.stringify(template.complete("authorization.verification:un"))).toEqual([
			"authorization.verification:unavailable_",
		])
		expect(Completion.stringify(template.complete("authorization.verification:"))).toEqual([
			"authorization.verification:*_",
			"authorization.verification:*_*",
			"authorization.verification:verified_",
			"authorization.verification:/_/",
			"authorization.verification:!_",
			"authorization.verification:_*",
			"authorization.verification:unavailable_",
			"authorization.verification:rejected_",
		])
	})
	it("suggestions", () => {
		const completion = template.complete("authorization:has(mercha)")
		expect(selectively.Type.getSuggestion(completion[0], "authorization.has(mercha".length)).toEqual("nt")
	})
})
