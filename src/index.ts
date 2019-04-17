import parser from './parser';
import autocompleteArgumentValue from './argument/autocomplete-argument-value';
import { setCommands, getCommands } from './command/commands';
import { Command, CommandArgument, ParsedArgument } from './models/command.model';

export {
  parser, autocompleteArgumentValue, setCommands, getCommands,
  Command, CommandArgument, ParsedArgument,
};
export default parser;
