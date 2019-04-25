import test from 'ava';

import commands from '../utils/commands';
import { CommandArgument } from '../../src/models/command.model';
import { autocompleteArgumentValue, autocompleteArgumentName } from '../../src/argument/autocomplete-argument';

test('autocomplete a predictable argument value with a single possibility', async (t) => {
  const argument: CommandArgument = {
    name: '--login_name',
    alias: '-l',
    requireValue: true,
    possibilities: ['root', 'root2', 'user'],
  };

  const autocompletePossibilities = autocompleteArgumentValue(argument, 'us');

  t.deepEqual(autocompletePossibilities, ['user']);
});

test('autocomplete a predictable argument value with multiple possiblities', async (t) => {
  const argument: CommandArgument = {
    name: '--login_name',
    alias: '-l',
    requireValue: true,
    possibilities: () => ['root', 'rpi', 'ADMIN'].map((user) => user.toLowerCase()),
  };

  const autocompletePossibilities = autocompleteArgumentValue(argument, 'r');

  t.deepEqual(autocompletePossibilities, ['root', 'rpi']);
});

test("can't find values to autocomplete", async (t) => {
  const argument: CommandArgument = {
    name: '--login_name',
    alias: '-l',
    requireValue: true,
    possibilities: ['root', 'root2', 'user'],
  };

  const autocompletePossibilities = autocompleteArgumentValue(argument, 'bla');

  t.deepEqual(autocompletePossibilities, []);
});

test('autocomplete an argument name', async (t) => {
  const suggestions = autocompleteArgumentName(commands[0], '--i');

  t.deepEqual(suggestions, ['--identity_file']);
});

test('unable to find a matching argument name', async (t) => {
  const suggestions = autocompleteArgumentName(commands[0], '--hello');

  t.deepEqual(suggestions, []);
});
