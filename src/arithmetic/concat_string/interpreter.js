import * as tokens from "./tokens"
import generateInterpreter from "../generate_interpreter"

const interpreter = generateInterpreter(tokens)

export default interpreter
