# selectively
Create selection by filtering a collection.

# Selectively Grammar
## Symbols
- _bool-expr_ (boolean expression)
- _prop_ (property, identifier (id) or combination of identifiers, e.g. identifier.identifier (id<span>.id))
- id (identifier)
- _expr_ (expression)
- _expr-op_ (expression operator e.g. >, <, >=, <=)
- _alg-expr_ (algebraic expression)
- _bin-op_ (binary operator)

## Production Rules

### Boolean Rules:
- _bool-expr_ -> _prop_ ":" _expr_ | _prop_ _expr-op_ _expr_ | (_bool-expr_) | _bool-expr_ "|" _bool-expr_ | _bool-expr_ _bool-expr_ | !_bool-expr_  
- _prop_ -> _prop_ "." id | id  
- _expr_ -> _prop_ | string | _alg-expr_ | (_expr_) | "!"_expr_ | _expr_ "|" _expr_    
- _expr-op_ -> < | > | <= | >=  
### Algebraic Rules:  
- _alg-expr_ -> number | _alg-expr_ _bin-op_ _alg-expr_ | (_alg-expr_)  
- _bin-op_ -> + | - | / | *  

## Merchant Rules
All **id** could be **id.<span>id.<span>id...**  
### Allowed Strings

	id>num  
	id<=str  
	!(id:str)  
	id:(str | str)  
	id:((str | str) | str)  
	(id<num)  
	id:num  
	id:!num  
	id:!(num | num)  
	id:(num | !num)  
	id:id  
	id>id  
	(((id>num)))  
	(id>(num))  
	id.id:(id.id | str | num) | id.id.id:id.id  
	id>num + num  
	id<= num + (num * num) / num - num

### Disallowed Strings

Open brackets:  

	(((id>num))
Mix of _prop_ ":" _expr_ and _prop_ _expr-op_ _expr_  

	id:(id>num)   

## Special Rules

### _prop_ _expr-op_ _expr_

#### Left-hand side:  

	Can be ambiguous, e.g. amount, where amount is an identifier which can be found as a property on several properties.

#### Right-hand side:

	Can't be ambiguous, it must refer to a string, number or a unique identifier, e.g. "uniqueIdentifier.amount". An ambiguous identifier will be interpreted as a string. 
	
## What is What?

- 3.14 => number
- identifier | identifier.identifier => property or properties
- unique_identifier.identifier => property
- .identifier => property if the identifier is a property of the base object, otherwise string.
- 1.B2 => string
- card.3d.secure => property
- 20-12-24 => string
- 20 - 12 - 24 => algebraic expression (uses whitespaces around the operators.)
- "20 - 12 - 24" => string. ("" forces an)
- Violation of the rules gives red underlining.

