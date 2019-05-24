<!-- markdownlint-disable MD029 -->
# @totominc/command-parser

[![CircleCI](https://circleci.com/gh/TotomInc/command-parser/tree/master.svg?style=shield)](https://circleci.com/gh/TotomInc/command-parser/tree/master)
[![codecov](https://codecov.io/gh/TotomInc/command-parser/branch/master/graph/badge.svg)](https://codecov.io/gh/TotomInc/command-parser)

> A modulable UNIX terminal command-parser, originally created for skid-inc incremental-game.

⚠️ this is an experimental library, getting new features and bug-fixes as I encounter them on skid-inc.

## Usage

1. install using `npm` or `yarn`

```bash
npm i @totominc/command-parser --save
# or with Yarn
yarn add @totominc/command-parser
```

2. import in your code, see [the API](#API) for exported functions

### Basic usage using the `parser` function

```typescript
// make sure to take a look at `public/index.ts` for more examples.

// the parser function is the default export of the module.
import parse, { Command } from '@totominc/command-parser';

// your array of commands which is needed everytime you want to parse or
// autocomplete a user-input.
const commands: Command[] = [{
  name: 'ssh',
  description: 'connect to another server which supports the SSH protocol',
  requireValue: true,
  // a command value which doesn't include the `@` character will be invalid.
  validation: (value) => value.indexOf('@') > -1,
  arguments: [
    {
      name: '--identity_file',
      alias: '-i',
      requireValue: true,
      // `--identity_file` argument value which doesn't include the `.ssh`
      // string will be invalid.
      validation: (value) => value.indexOf('.ssh') > -1,
    },
  ],
}];

// parse a user-input command and verify if it's a valid command with valid
// arguments.
const { command, parsedArgs, valid } = parse<Command>(
  'ssh -i ~/.ssh/rpi pi@home',
  commands,
);

console.log(command, parsedArgs, valid);
```

### Dynamically autocomplete a user input

```typescript
import { autocomplete, Command } from '@totominc/command-parser';

const commands: Command[] = [{
  name: 'ssh',
  description: 'connect to another server which supports the SSH protocol',
  requireValue: true,
  validation: (value) => value.indexOf('@') > -1,
  arguments: [
    {
      name: '--login_name',
      alias: '-l',
      requireValue: true,
      // it is possible to dynamically autocomplete the `--login_name` argument
      // value since it's possible to predicate the value with the
      // `possibilities` array (unlike the `validation` function).
      possibilities: ['root', 'admin', 'admin-bis'],
    },
  ],
}];

// autocomplete the `--login_name` argument value against the array of
// commands.
const suggestions = autocomplete('ssh -l ad', commands);

// `['admin', 'admin-bis']`
console.log(suggestions);
```

## API

### Functions

#### `parser<C>(input, commands): { command, parsedArgs, valid }`

Parse user-input, find the command and extract arguments. Test the validity
of arguments and of the command value. Return the command found, parsed
arguments and validity of the input.

> This is the default export of the module, the parser function can be imported by doing this `import awesomeParser from '@totominc/command-parser';`.

**Kind**: global function  

**Parameters**:

| Param    | Type     | Description                                             |
| -------- | -------- | ------------------------------------------------------- |
| input    | `string` | user-input terminal command                             |
| commands | `any[]`  | an array of commands with a type that extends `Command` |

**Returned**:

| Return     | Type               | Description                                            |
| ---------- | ------------------ | ------------------------------------------------------ |
| command    | `C` or `undefined` | return the command found (or `undefined` if not found) |
| parsedArgs | `ParsedArg[]`      | array of parsed arguments                              |
| valid      | `boolean`          | validity of the user-input                             |

#### `autocomplete<C>(input, commands): string[]`

Autocomplete a user-input based on the array of `Command` passed.
Automatically determinate if the value to autocomplete is an argument or a
command name/value.

> This function is used when you want to dynamically autocomplete a user-input, like in a shell. i.e.: `cat ~/.zsh` will show multiple files (`.zshrc`, `.zsh_history`).

**Kind**: global function

**Parameters**:

| Param    | Type     | Description                                             |
| -------- | -------- | ------------------------------------------------------- |
| input    | `string` | user-input from the terminal                            |
| commands | `any[]`  | an array of commands with a type that extends `Command` |

#### `findCommand<C>(value, commands): C | Command`

Try to find the command from user-input command-name. You can use an
extended command interface by passing it as a generic.

**Kind**: global function  

**Parameters**:

| Param    | Type        | Description                                             |
| -------- | ----------- | ------------------------------------------------------- |
| value    | `string`    | input containing the name of the command                |
| commands | `Command[]` | an array of commands with a type that extends `Command` |

### Models

#### Command

```typescript
interface Command {
  /** Name of the command */
  name: string;
  /** Description of the command (i.e.: can be displayed in the help command) */
  description: string;
  /** If the command require a value */
  requireValue: boolean;
  /** An array of command arguments */
  arguments?: CommandArgument[];
  /**
   * If the command require a value (not an argument value), have a list of
   * possibilities to display and to autocomplete. This is used by default
   * to check if the value is valid.
   */
  possibilities?: ((...args: any) => string[]) | string[];
  /**
   * If the command require a dynamic, non-predictable value, you can pass a
   * validator function.
   */
  validation?: (value: string) => boolean;
}
```

#### CommandArgument

```typescript
interface CommandArgument {
  /** Name of the argument */
  name: string;
  /** Alias of the argument instead of calling it by its name */
  alias?: string;
  /** If argument require a value, e.g.: `--identity_file ~/.ssh/key` */
  requireValue: boolean;
  /**
   * An array of possibilities if the argument require specific values, mostly
   * used by the autocomplete.
   *
   * If `valueValidation` function is not present, it will be used to determine
   * if the argument is valid.
   */
  possibilities?: ((...args: any) => string[]) | string[];
  /**
   * Function to validate the value of the argument, where context parameter
   * can help to determine what value to validate depending on the arguments
   * context.
   *
   * It can be used when you don't know the value in advance, like
   * validating a number or a specific string regex.
   */
  validation?: (value: string) => boolean;
}
```

#### ParsedArgument

```typescript
interface ParsedArgument {
  /**
   * Nature/type of the argument:
   *
   * - `CMD_VALUE` is the value of a command.
   * - `ARG_NAME` is the name of an argument.
   * - `ARG_VALUE` is the value of an argument found by its `ARG_NAME`.
   */
  type: 'CMD_VALUE' | 'ARG_NAME' | 'ARG_VALUE';
  /**
   * Reflect the original `Command` or `CommandArgument`, can be undefined when
   * not able to recognize a command or argument being typed.
   */
  reflect?: Command | CommandArgument;
  /** Original value (from the input) of the argument */
  value: string;
  /** If the argument value is valid and matches */
  isValid: boolean;
}
```

## Contributing

Contributions are welcome, make sure to add/edit tests when you are contributing.

## License

See the [MIT License](https://github.com/totominc/command-parser/blob/master/LICENSE) file.
