import { ParsedArgument, Command } from './models/command.model';
import normalize, { normalizeWithoutLowercase } from './normalize';
import findCommand from './command/find-command';
import findArgument from './argument/find-argument';
import validateArgument from './argument/validate-argument';
import validateCommandValue from './command/validate-command-value';

/**
 * Parse user-input, find the command and extract arguments. Test the validity
 * of arguments and of the command value. Return the command found, parsed
 * arguments and validity of the input.
 *
 * @param input user-input terminal command
 * @param commands an array of commands with a type that extends `Command`
 */
function parse<C extends Command>(
  input: string,
  commands: C[],
): {
  command: C | undefined;
  parsedArgs: ParsedArgument[];
  valid: boolean;
} {
  const originalsSplitted = normalizeWithoutLowercase(input).split(' ');
  const splitted = normalize(input).split(' ');

  const command = findCommand<C>(splitted[0], commands);

  const originalArgs = originalsSplitted.splice(1, originalsSplitted.length);
  const args = splitted.splice(1, splitted.length);

  const parsedArgs: ParsedArgument[] = [];

  let valid = false;

  if (command) {
    valid = !command.requireValue;

    for (let i = 0; i < args.length; i += 1) {
      const arg = args[i];
      const originalArg = originalArgs[i];

      // Try to detect an argument (and its value if it have one)
      if (arg.startsWith('-')) {
        const parsedArg = findArgument(command, arg);

        // If the argument have been found
        if (parsedArg) {
          parsedArgs.push({
            type: 'ARG_NAME',
            reflect: parsedArg,
            value: originalArg,
            isValid: true,
          });

          // If the parsed argument require a value, make sure the value is
          // valid (and increase our loop index)
          if (parsedArg.requireValue) {
            const nextArgValue = args[i + 1];
            const nextArgValid = validateArgument(parsedArg, nextArgValue);

            parsedArgs.push({
              type: 'ARG_VALUE',
              reflect: parsedArg,
              value: nextArgValue,
              isValid: nextArgValid,
            });

            i = i + 1;
          }
        }
        // Unable to find a valid argument name
        else {
          parsedArgs.push({
            type: 'ARG_NAME',
            value: originalArg,
            isValid: false,
          });
        }
      }
      // If not an argument, fallback on the command value and end the loop
      else {
        const commandValueValid = validateCommandValue(command, arg);

        parsedArgs.push({
          type: 'CMD_VALUE',
          reflect: command,
          value: originalArg,
          isValid: commandValueValid,
        });

        valid = commandValueValid;
        i = args.length;
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
