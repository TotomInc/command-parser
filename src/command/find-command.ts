import { Command } from '../models/command.model';
import { getCommands } from './commands';

/**
 * Try to find the command from user-input command-name.
 *
 * @param value input containing the name of the command
 */
function findCommand(value: string): Command | undefined {
  const commands = getCommands();

  return commands.find((command) => command.name === value);
}

export default findCommand;
