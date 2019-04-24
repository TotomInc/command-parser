import { Command } from '../models/command.model';

/**
 * Find commands name suggestions based on the user-input command name.
 *
 * @param name user-input potential command name
 * @param commands an array of commands with a type that extends `Command`
 */
export function autocompleteCommandName(name: string, commands: Command[]): string[] {
  const potentialCommands = commands
    .filter((command) => command.name.startsWith(name))
    .map((command) => command.name);

  return potentialCommands;
}

/**
 * Return suggestions of a command value based on a command and on the
 * user-input value being typed.
 *
 * @param value current value being typed by the user
 * @param command matching command object
 */
export function autocompleteCommandValue(value: string, command: Command): string[] {
  const possibilities =
    typeof command.possibilities === 'function'
      ? command.possibilities()
      : command.possibilities || [];

  const suggestions = possibilities.filter((possibility) => possibility.startsWith(value));

  return suggestions;
}
