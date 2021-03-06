import test from 'ava';

import commands from '../utils/commands';
import { autocompleteCommandName, autocompleteCommandValue } from '../../src/command/autocomplete-command';

test('autocomplete an existing command', async (t) => {
  const suggestions = autocompleteCommandName('ss', commands);

  t.deepEqual(suggestions, ['ssh']);
});

test('returns multiple command names matching the input', async (t) => {
  const suggestions = autocompleteCommandName('s', commands);

  t.deepEqual(suggestions, ['ssh', 'say', 'syslog', 'softwareupdate']);
});

test('unable to find matching commands', async (t) => {
  const suggestions = autocompleteCommandName('hello', commands);

  t.deepEqual(suggestions, []);
  t.is(suggestions.length, 0);
});

test('autocomplete a command value', async (t) => {
  const suggestions = autocompleteCommandValue('/hom', commands[2]);

  t.deepEqual(suggestions, ['/home/admin/system.log']);
});

test("can't autocomplete a command value for a command that doesn't have possibilities (empty array)", async (t) => {
  const suggestions = autocompleteCommandValue('az', commands[3]);

  t.deepEqual(suggestions, []);
});

test('returns multiple command values matching the input', async (t) => {
  const suggestions = autocompleteCommandValue('wo', commands[1]);

  t.deepEqual(suggestions, ['world', 'word']);
  t.is(suggestions.length, 2);
});

test('unable to find matching command values', async (t) => {
  const suggestions = autocompleteCommandValue('qwerty', commands[1]);

  t.deepEqual(suggestions, []);
  t.is(suggestions.length, 0);
});
