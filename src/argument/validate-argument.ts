import { CommandArgument } from '../models/command.model';

/**
 * Validate an argument value with 2 methods only if the argument requires a
 * value. Validation is executed in this order:
 *
 * 1. If the value is predictable, try to find it from an array of
 *    `possibilities`, which can be obtained from a context function or as a
 *    raw `string[]`.
 *
 * 2. If the argument have a validator function, execute this function against
 *    the argument value.
 *
 * @param argument argument of a command
 * @param value name or value of an argument
 */
function validateArgument(argument: CommandArgument, value: string): boolean {
  const possibilities =
    typeof argument.possibilities === 'function' ? argument.possibilities() : argument.possibilities || [];

  let isValid = !argument.requireValue;

  if (argument.requireValue) {
    if (possibilities.length) {
      isValid = possibilities.indexOf(value) > -1;
    }

    if (typeof argument.validation === 'function') {
      isValid = argument.validation(value);
    }
  }

  return isValid;
}

export default validateArgument;
