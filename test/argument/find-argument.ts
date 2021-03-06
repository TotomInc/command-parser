import test from 'ava';

import commands from '../utils/commands';
import findCommand from '../../src/command/find-command';
import findArgument from '../../src/argument/find-argument';
import { Command } from '../../src/models/command.model';

test('find an argument from a command', async (t) => {
  const command = findCommand<Command>('ssh', commands)!;
  const argument = findArgument(command!, '--identity_file')!;

  t.is(argument, commands[0].arguments![0]);
});

test("can't find a non-existing argument from a command", async (t) => {
  const command = findCommand<Command>('ssh', commands)!;
  const argument = findArgument(command!, '--blah');

  t.is(argument, undefined);
});
