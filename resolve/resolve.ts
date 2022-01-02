import { Definition } from "../Definition"
import { Rule } from "../Rule"

export function resolve(
	definitions: Record<string, Definition>,
	rule: Rule,
	argument: { input: any[]; identifier: string[] } = { input: [], identifier: [] }
): Rule {
	return resolvers[rule?.class]?.(definitions, rule, argument) ?? rule
}

export type Resolver<T extends Rule = Rule> = (
	definitions: Record<string, Definition>,
	rule: T,
	argument: { input: any[]; identifier: string[] }
) => T
const resolvers: { [className: string]: Resolver | undefined } = {}
export function add<T extends Rule>(className: string, resolver: Resolver<T>): void {
	resolvers[className] = resolver
}
