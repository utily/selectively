import "./Always"
import { and } from "./And"
import { any } from "./Any"
import { Base, create } from "./Base"
import { Criteria } from "./Criteria"
import { endsWith } from "./EndsWith"
import { every } from "./Every"
import { includes } from "./Includes"
import "./Is"
import { match } from "./Match"
import { not } from "./Not"
import { or } from "./Or"
import { property } from "./Property"
import { some } from "./Some"
import { startsWith } from "./StartsWith"

function is(criteria: Criteria): Base
function is(criteria: Criteria, value?: any): boolean
function is(criteria: Criteria, value?: any): Base | boolean {
	const result = create(criteria)
	return value ? result.is(value) : result
}
function filter<T>(criteria: Criteria, value: T[]): T[] {
	const c = create(criteria)
	return value.filter(element => c.is(element))
}

export {
	Criteria,
	any,
	and,
	create,
	endsWith,
	every,
	filter,
	includes,
	is,
	match,
	not,
	or,
	property,
	some,
	startsWith,
}
