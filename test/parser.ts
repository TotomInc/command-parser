import test from 'ava';

import parse from '../src/parser';
import { setCommands } from '../src/command/commands';
import commands from './utils/commands';

test.before((t) => {
  setCommands(commands);
});

test(`parse a command with an argument which require a value`, async (t) => {
  const { command, parsedArgs, valid } = parse(
    'ssh -i ~/.ssh/home-rpi root@rpi',
  );

  t.is(command, commands[0]);
  t.is(parsedArgs[0].type, 'ARG_NAME');
  t.is(parsedArgs[1].type, 'ARG_VALUE');
  t.is(parsedArgs[2].type, 'CMD_VALUE');
  t.true(valid);
});

test(`parse a command with an argument which doesn't require a value`, async (t) => {
  const { command, parsedArgs, valid } = parse('ssh --force root@rpi');

  t.is(command, commands[0]);
  t.is(parsedArgs[0].type, 'ARG_NAME');
  t.is(parsedArgs[0].value, '--force');
  t.is(parsedArgs[1].type, 'CMD_VALUE');
  t.is(parsedArgs[1].value, 'root@rpi');
  t.true(valid);
});

test(`parse a command without argument but with a value`, async (t) => {
  const { command, parsedArgs, valid } = parse('ssh root@rpi');

  t.is(command, commands[0]);
  t.is(parsedArgs[0].type, 'CMD_VALUE');
  t.is(parsedArgs[0].value, 'root@rpi');
  t.true(valid);
});

test(`parse a non-existing command`, async (t) => {
  const { command, parsedArgs, valid } = parse('sh --force root@rpi');

  t.is(command, undefined);
  t.is(parsedArgs.length, 0);
  t.false(valid);
});

test(`parse a command without a value`, async (t) => {
  const { parsedArgs, valid } = parse('ssh');

  t.is(parsedArgs.length, 0);
  t.false(valid);
});

test(`parse a command with an invalid value`, async (t) => {
  const { parsedArgs, valid } = parse('ssh -i ~/.ssh/key user$rpi');

  t.is(parsedArgs.length, 3);
  t.false(parsedArgs[2].isValid);
  t.false(valid);
});

test(`parse a command with an invalid argument value`, async (t) => {
  const { parsedArgs, valid } = parse('ssh -i /home/admin user@rpi');

  t.is(parsedArgs.length, 3);
  t.false(parsedArgs[1].isValid);
  t.false(valid);
});
