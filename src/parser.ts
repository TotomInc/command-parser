import { ParsedArgument } from './models/command.model';
import normalize from './normalize';
import findCommand from './command/find-command';
import findArgument from './argument/find-argument';
import validateArgument from './argument/validate-argument';
import validateCommandValue from './command/validate-command-value';

/**
 * Parse user-input, find the command and extract arguments. Test the validity
 * of arguments and of the command value. Return the command found, parsed
 * arguments and valid.
 *
 * @param input user-input terminal command
 */
function parse(input: string) {
  const splitted = normalize(input).split(' ');

  const command = findCommand(splitted[0]);
  const args = splitted.splice(1, splitted.length);

  const parsedArgs: ParsedArgument[] = [];

  let valid = false;

  if (command) {
    valid = !command.requireValue;

    for (let i = 0; i < args.length; i += 1) {
      const arg = args[i];
      const parsedArg = findArgument(command, arg);

      if (parsedArg) {
        const nextArgValue = args[i + 1];
        const nextArgValid = validateArgument(parsedArg, nextArgValue);

        parsedArgs.push({
          type: 'ARG_NAME',
          reflect: parsedArg,
          value: arg,
          isValid: true,
        });

        if (parsedArg.requireValue) {
          parsedArgs.push({
            type: 'ARG_VALUE',
            reflect: parsedArg,
            value: nextArgValue,
            isValid: nextArgValid,
          });

          i = i + 1;
        }
      } else {
        const commandValueValid = validateCommandValue(command, arg);

        parsedArgs.push({
          type: 'CMD_VALUE',
          reflect: command,
          value: arg,
          isValid: commandValueValid,
        });

        valid = commandValueValid;
      }
    }
  }

  valid = valid ? parsedArgs.every((arg) => arg.isValid) : valid;

  return {
    command,
    parsedArgs,
    valid,
  };
}

export default parse;
