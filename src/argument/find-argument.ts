import { Command, CommandArgument } from '../models/command.model';

/**
 * Try to find an argument of a command based on a value. Find both by argument
 * name and alias.
 *
 * @param command command to find arguments against
 * @param value argument name of argument value
 */
function findArgument(command: Command, value: string): CommandArgument | undefined {
  let argument: CommandArgument | undefined;

  if (command.arguments) {
    argument = command.arguments.find((arg) => {
      const byName = arg.name === value;
      const byAlias = arg.alias === value;

      return byName || byAlias;
    });
  }

  return argument;
}

export default findArgument;
