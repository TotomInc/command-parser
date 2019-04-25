import { CommandArgument, Command } from '../models/command.model';

/**
 * Return an array of arguments name matching with the current value being
 * typed from the user-input.
 *
 * @param command command object to find arguments from
 * @param value current value being typed by the user
 */
export function autocompleteArgumentName(command: Command, value: string): string[] {
  const possibilities = command.arguments ? command.arguments.map((argument) => argument.name) : [];
  const suggestions = possibilities.filter((possibility) => possibility.startsWith(value));

  return suggestions;
}

/**
 * Based on the `possibilities` of the argument, try to find possibilities for
 * the value to autocomplete.
 *
 * @param argument argument of a command
 * @param value typed value of an argument, to autocomplete
 */
export function autocompleteArgumentValue(argument: CommandArgument, value: string): string[] {
  const possibilities =
    typeof argument.possibilities === 'function'
      ? argument.possibilities()
      : argument.possibilities || [];

  const autocompletePossibilities = possibilities.filter((possibility) =>
    possibility.startsWith(value),
  );

  return autocompletePossibilities;
}
