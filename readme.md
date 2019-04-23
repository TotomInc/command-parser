<!-- markdownlint-disable MD029 -->
# @totominc/command-parser

[![CircleCI](https://circleci.com/gh/TotomInc/command-parser/tree/master.svg?style=shield)](https://circleci.com/gh/TotomInc/command-parser/tree/master)
[![codecov](https://codecov.io/gh/TotomInc/command-parser/branch/master/graph/badge.svg)](https://codecov.io/gh/TotomInc/command-parser)

> A modulable UNIX terminal command-parser, originally created for SkidInc incremental-game.

## Usage

1. install using npm or Yarn

```bash
npm i @totominc/command-parser --save
# or with Yarn
yarn add @totominc/command-parser
```

2. import in your code, see [the API](#API) for exported functions

```typescript
import parse from '@totominc/command-parser';

// your array of commands which is needed everytime you want to parse an input.
const commands: Command[] = [{
  name: 'ssh',
  description: 'connect to another server which supports the SSH protocol',
  requireValue: true,
  validation: (value) => value.indexOf('@') > -1,
  arguments: [
    {
      name: '--identity_file',
      alias: '-i',
      requireValue: true,
      validation: (value) => value.indexOf('.ssh') > -1,
    },
  ],
}];

// parse a user-input command and verify if it's a valid command with valid
// arguments against the commands argument parameter.
const { command, parsedArgs, valid } = parse<Command>(
  'ssh -i ~/.ssh/rpi pi@home',
  commands,
);

console.log(command, parsedArgs, valid);
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

#### `autocompleteArgumentValue(argument, value): string[]`

Based on the `possibilities` of the argument, try to find possibilities for
the value to autocomplete.

> Used for an autocomplete feature of your terminal, where only *matching* arguments/values will be returned. This can be customized with the `possibilities` function/array of the command.

**Kind**: global function  

**Parameters**:

| Param    | Type     | Description                                 |
| -------- | -------- | ------------------------------------------- |
| argument | `string` | argument of a command                       |
| value    | `string` | typed value of an argument, to autocomplete |

#### `findCommand<C>(value, commands): C | Command`

Try to find the command from user-input command-name. You can use an
extended command interface by passing it as a generic.

> It can be used with the `autocompleteArgumentValue` since you need to pass a recognized `Command` object.

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
  /** Reflect the original `Command` or `CommandArgument` */
  reflect: Command | CommandArgument;
  /** Original value (from the input) of the argument */
  value: string;
  /** If the argument value is valid and matches */
  isValid: boolean;
  /** Array of error messages explaining why the value is invalid */
  errors?: string;
}
```

## Contributing

Contributions are welcome, make sure to add/edit tests when you are contributing.

## License

See the [MIT License](https://github.com/totominc/command-parser/blob/master/LICENSE) file.
