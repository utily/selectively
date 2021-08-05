import { Definition } from "../Definition"
import { Rule } from "../Rule"

export function resolve(definitions: Definition[], rule: Rule, argument?: any[]): Rule {
	const resolver = resolvers[rule.class]
	console.log(resolvers.toString())
	return resolver ? resolver(definitions, rule, argument) : rule
}

export type Resolver<T extends Rule = Rule> = (definitions: Definition[], rule: T, argument?: any[]) => T
const resolvers: { [className: string]: Resolver | undefined } = {}
export function add<T extends Rule>(className: string, resolver: Resolver<T>): void {
	resolvers[className] = (resolver as any) as Resolver
}
