export interface Command {
  /** Name of the command */
  name: string;
  /** Aliases of the command instead of calling the command by its name */
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

export interface CommandArgument {
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

export interface ParsedArgument {
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
