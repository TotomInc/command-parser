import test from 'ava';

import commands from '../utils/commands';
import findCommand from '../../src/command/find-command';
import { setCommands } from '../../src/command/commands';

test.before((t) => {
  setCommands(commands);
});

test('find an existing command', async (t) => {
  const command = findCommand('ssh');

  t.deepEqual(command, commands[0]);
});

test("can't find a non-existing command", async (t) => {
  const command = findCommand('blah');

  t.is(command, undefined);
});
