import { Command } from '../models/command.model';

let commands: Command[] = [];

/**
 * Get the `commands` value which is the local variable.
 */
export function getCommands(): Command[] {
  return commands;
}

/**
 * Replace the current state of `commands` with a new array of `Command`.
 * Return the array of commands.
 *
 * @param newCommands an array of `Command`
 */
export function setCommands(newCommands: Command[]): Command[] {
  commands = newCommands;

  return commands;
}
