import { CommandArgument } from '../models/command.model';

/**
 * Based on the `possibilities` of the argument, try to find possibilities for
 * the value to autocomplete.
 *
 * @param argument argument of a command
 * @param value typed value of an argument, to autocomplete
 */
function autocompleteArgumentValue(argument: CommandArgument, value: string): string[] {
  const possibilities =
    typeof argument.possibilities === 'function' ? argument.possibilities() : argument.possibilities || [];

  const autocompletePossibilities = possibilities.filter((possibility) => possibility.startsWith(value));

  return autocompletePossibilities;
}

export default autocompleteArgumentValue;
