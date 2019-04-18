import { Command } from '../models/command.model';

/**
 * Validate a command value with 2 methods only if the command requires a
 * value. Validation is executed in this order:
 *
 * 1. If the value is predictable, try to find it from an array of
 *    `possibilities`, which can be obtained from a context function or as a
 *    raw `string[]`.
 *
 * 2. If the command have a validator function for the value, execute this
 *    function against the command value.
 *
 * @param command command to validate the value against
 * @param value value of a command
 */
function validateCommandValue(command: Command, value: string) {
  const possibilities =
    typeof command.possibilities === 'function' ? command.possibilities() : command.possibilities || [];

  let isValid = !command.requireValue;

  if (command.requireValue) {
    if (possibilities.length) {
      isValid = possibilities.indexOf(value) > -1;
    }

    if (typeof command.validation === 'function') {
      isValid = command.validation(value);
    }
  }

  return isValid;
}

export default validateCommandValue;
