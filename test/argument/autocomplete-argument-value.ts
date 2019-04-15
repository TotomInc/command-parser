import test from 'ava';

import { CommandArgument } from '../../src/models/command.model';
import { setCommands } from '../../src/command/commands';
import autocompleteArgumentValue from '../../src/argument/autocomplete-argument-value';
import commands from '../utils/commands';

test.before((t) => {
  setCommands(commands);
});

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
    possibilities: ['root', 'root2', 'user'],
  };

  const autocompletePossibilities = autocompleteArgumentValue(argument, 'ro');

  t.deepEqual(autocompletePossibilities, ['root', 'root2']);
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
