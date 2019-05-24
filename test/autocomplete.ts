import test from 'ava';

import autocomplete from '../src/autocomplete';
import commands from './utils/commands';

test('it should return a single suggestion of a command name', async (t) => {
  const suggestions = autocomplete('sysl', commands);

  t.deepEqual(suggestions, ['syslog']);
});

test('it should return multiple suggestions for command names', async (t) => {
  const suggestions = autocomplete('s', commands);

  t.deepEqual(suggestions, ['ssh', 'say', 'syslog', 'softwareupdate']);
});

test("it should not return suggestions for command names that doesn't match", async (t) => {
  const suggestions = autocomplete('hello', commands);

  t.deepEqual(suggestions, []);
});

test('it should return a single suggestion for a command argument name', async (t) => {
  const suggestions = autocomplete('ssh --log', commands);

  t.deepEqual(suggestions, ['--login_name']);
});

test('it should return multiple suggestions for command argument names', async (t) => {
  const suggestions = autocomplete('ssh --', commands);

  t.deepEqual(suggestions, ['--identity_file', '--login_name', '--force']);
});

test('it should return a suggestion for an argument value being typed', async (t) => {
  const suggestions = autocomplete('ssh --login_name totom', commands);

  t.deepEqual(suggestions, ['totominc']);
});

test('it should return a suggestion for a command value', async (t) => {
  const suggestions = autocomplete('say hel', commands);

  t.deepEqual(suggestions, ['hello']);
});
