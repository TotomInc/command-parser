import test from 'ava';

import { CommandArgument } from '../../src/models/command.model';
import { setCommands } from '../../src/command/commands';
import validateArgument from '../../src/argument/validate-argument';
import commands from '../utils/commands';

test.before((t) => {
  setCommands(commands);
});

test('validate an argument value with pre-defined/predictable possibilities', async (t) => {
  const argument: CommandArgument = {
    name: '--identity_file',
    alias: '-i',
    requireValue: true,
    possibilities: ['~/.ssh/test', '~/.ssh/hello', '~/.ssh/key-test'],
  };

  const argumentValueValid = validateArgument(argument, '~/.ssh/key-test');

  t.true(argumentValueValid);
});

test('invalidate an argument value with pre-defined/predictable possibilities', async (t) => {
  const argument: CommandArgument = {
    name: '--identity_file',
    alias: '-i',
    requireValue: true,
    possibilities: ['~/.ssh/test', '~/.ssh/hello', '~/.ssh/key-test'],
  };

  const argumentValueValid = validateArgument(argument, '~/key-test');

  t.false(argumentValueValid);
});

test('validate an argument value with a custom validator function', async (t) => {
  const argument: CommandArgument = {
    name: '--identity_file',
    alias: '-i',
    requireValue: true,
    validation: (value) => value.indexOf('.ssh') > -1,
  };

  const argumentValueValid = validateArgument(argument, '~/.ssh/key-test');

  t.true(argumentValueValid);
});

test('invalid argument value with a custom validator function', async (t) => {
  const argument: CommandArgument = {
    name: '--identity_file',
    alias: '-i',
    requireValue: true,
    validation: (value) => value.indexOf('.ssh') > -1,
  };

  const argumentValueValid = validateArgument(argument, '~/key-test');

  t.false(argumentValueValid);
});

test('validate an argument value using the validator function when possibilities are invalid', async (t) => {
  const argument: CommandArgument = {
    name: '--identity_file',
    alias: '-i',
    requireValue: true,
    possibilities: ['~/.ssh/test', '~/.ssh/hello'],
    validation: (value) => value.indexOf('.ssh/key-test') > -1,
  };

  const argumentValueValid = validateArgument(argument, '~/.ssh/key-test');

  t.true(argumentValueValid);
});

test('invalidate an argument value after using both a validator function and possibilities', async (t) => {
  const argument: CommandArgument = {
    name: '--identity_file',
    alias: '-i',
    requireValue: true,
    possibilities: ['~/.ssh/test', '~/.ssh/hello'],
    validation: (value) => value.indexOf('.ssh/key-test') > -1,
  };

  const argumentValueValid = validateArgument(
    argument,
    '~/.ssh/home-raspberry',
  );

  t.false(argumentValueValid);
});
