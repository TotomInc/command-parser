import { Command, CommandArgument } from './models/command.model';
import { autocompleteArgumentName, autocompleteArgumentValue } from './argument/autocomplete-argument';
import { autocompleteCommandName, autocompleteCommandValue } from './command/autocomplete-command';
import normalize from './normalize';
import parse from './parser';

/**
 * Autocomplete a user-input based on the array of `Command` passed.
 * Automatically determinate if the value to autocomplete is an argument or a
 * command name/value.
 *
 * @param input user-input from the terminal
 * @param commands an array of commands with a type that extends `Command`
 * @returns an array of autocomplete possibilities
 */
function autocomplete<C extends Command>(input: string, commands: C[]): string[] {
  const { command, parsedArgs } = parse(input, commands);
  const lastParsedArg = parsedArgs[parsedArgs.length - 1];
  const cleanedInput = normalize(input).split(' ');
  const lastInputValue = cleanedInput[cleanedInput.length - 1];

  let suggested: string[] = [];

  // If the command is not found yet, we need to autocomplete the command name
  if (!command) {
    const commandName = cleanedInput.slice(0, 1).toString();

    suggested = autocompleteCommandName(commandName, commands);
  }
  // If an argument name is being written, autocomplete the argument name
  else if (lastInputValue.startsWith('-')) {
    suggested = autocompleteArgumentName(command, lastInputValue);
  }
  // If an argument requires a value, autocomplete the argument value
  else if (lastParsedArg.type === 'ARG_NAME') {
    suggested = autocompleteArgumentValue(lastParsedArg.reflect as CommandArgument, lastInputValue);
  }
  // If there is a command, autocomplete the command value
  else if (command) {
    suggested = autocompleteCommandValue(lastInputValue, command);
  }

  return suggested;
}

export default autocomplete;
