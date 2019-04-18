import { Command } from '../models/command.model';

/**
 * Try to find the command from user-input command-name. You can use an
 * extended command interface by passing it as a generic.
 *
 * @param value input containing the name of the command
 * @param commands an array of commands with a type that extends `Command`
 */
function findCommand<C extends Command>(
  value: string,
  commands: C[],
): C | undefined {
  return commands.find((command) => command.name === value);
}

export default findCommand;
