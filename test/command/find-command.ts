import test from 'ava';

import commands from '../utils/commands';
import findCommand from '../../src/command/find-command';
import { Command } from '../../src/models/command.model';

test('find an existing command', async (t) => {
  const command = findCommand<Command>('ssh', commands);

  t.deepEqual(command, commands[0]);
});

test("can't find a non-existing command", async (t) => {
  const command = findCommand<Command>('blah', commands);

  t.is(command, undefined);
});
