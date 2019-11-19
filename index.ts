import "./Always"
import { and } from "./And"
import { any } from "./Any"
import { Rule, create } from "./Rule"
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
import "./Tuple"

function is(criteria: Criteria): Rule
function is(criteria: Criteria, value?: any): boolean
function is(criteria: Criteria, value?: any): Rule | boolean {
	const result = create(criteria)
	return value ? result.is(value) : result
}
function filter<T>(criteria: Criteria, value: T[]): T[] {
	const c = create(criteria)
	return c.filter(value)
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
