import { Command, CommandArgument } from '../models/command.model';

/**
 * Try to find an argument of a command with a value which can be an argument
 * name or value. Try to find both by argument name and alias.
 *
 * @param command original command to find argument
 * @param value name or value of a potential argument
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
