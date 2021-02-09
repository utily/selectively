export { parse } from "./parse"

// Order matters
import "./Every"
import "./Some"
import "./group"
import "./GreaterThan"
import "./GreaterThanOrEqual"
import "./LesserThan"
import "./LesserThanOrEqual"
import "./Or"
import "./Not"
import "./Property"
import "./Includes"
import "./StartsWith"
import "./EndsWith"
import "./Has"
import "./Is"
import "./ignore" // Reads every token and throws it away so that parsing is finite
