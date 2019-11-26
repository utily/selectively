import * as selectively from "../index"

describe("parse.group", () => {
	it("status:some(created | charged | paid | pending | deferred | ordered | denied) created:()", () => expect(selectively.parse("status:some(created | charged | paid | pending | deferred | ordered | denied) created:()").toString()).toEqual("status:some(created | charged | paid | pending | deferred | ordered | denied) created:()"))
	it("status:some(charged | ordered) created:2019-11*", () => expect(selectively.parse("status:some(charged | ordered) created:2019-11*").toString()).toEqual("status:some(charged | ordered) created:2019-11*"))
	it("status:some(charged | ordered) created:2019-11-26* client:CGaDLvmqkExR*", () => expect(selectively.parse("status:some(charged | ordered) created:2019-11-26* client:CGaDLvmqkExR*").toString()).toEqual("status:some(charged | ordered) created:2019-11-26* client:CGaDLvmqkExR*"))
})
