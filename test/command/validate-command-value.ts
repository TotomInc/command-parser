import test from 'ava';

import { Command } from '../../src/models/command.model';
import validateCommandValue from '../../src/command/validate-command-value';

test(`validate a command value with pre-defined/predictable possibilities`, async (t) => {
  const command: Command = {
    name: 'ssh',
    description: 'connect to another server using SSH protocol',
    requireValue: true,
    possibilities: ['user@home', 'pi@rpi', 'root@debian'],
  };

  const commandValueValid = validateCommandValue(command, 'root@debian');

  t.true(commandValueValid);
});

test(`invalidate a command value with pre-defined/predictable possibilities`, async (t) => {
  const command: Command = {
    name: 'ssh',
    description: 'connect to another server using SSH protocol',
    requireValue: true,
    possibilities: ['user@home', 'pi@rpi', 'root@debian'],
  };

  const commandValueValid = validateCommandValue(command, 'hello@world');

  t.false(commandValueValid);
});

test(`validate a command value with a custom validator function`, async (t) => {
  const command: Command = {
    name: 'ssh',
    description: 'connect to another server using SSH protocol',
    requireValue: true,
    validation: (value) => value.indexOf('@') > -1,
  };

  const commandValueValid = validateCommandValue(command, 'root@debian');

  t.true(commandValueValid);
});

test(`invalidate a command value with a custom validator function`, async (t) => {
  const command: Command = {
    name: 'ssh',
    description: 'connect to another server using SSH protocol',
    requireValue: true,
    validation: (value) => value.indexOf('$') > -1,
  };

  const commandValueValid = validateCommandValue(command, 'root@debian');

  t.false(commandValueValid);
});

test(`validate a command value using the validator function when the possibilities are invalid`, async (t) => {
  const command: Command = {
    name: 'ssh',
    description: 'connect to another server using SSH protocol',
    requireValue: true,
    possibilities: ['user@home', 'pi@rpi', 'root@debian'],
    validation: (value) => value.indexOf('@') > -1,
  };

  const commandValueValid = validateCommandValue(command, 'admin@ubuntu');

  t.true(commandValueValid);
});

test(`invalidate a command value after using both a validator function and possibilities`, async (t) => {
  const command: Command = {
    name: 'ssh',
    description: 'connect to another server using SSH protocol',
    requireValue: true,
    possibilities: ['user@home', 'pi@rpi', 'root@debian'],
    validation: (value) => value.indexOf('@') > -1,
  };

  const commandValueValid = validateCommandValue(command, 'admin[at]ubuntu');

  t.false(commandValueValid);
});
