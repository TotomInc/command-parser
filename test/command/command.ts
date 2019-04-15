import test from 'ava';

import commands from '../utils/commands';
import { setCommands, getCommands } from '../../src/command/commands';

test('change the state of the commands using `setCommands`', async (t) => {
  const newCommands = setCommands(commands);

  t.deepEqual(newCommands, commands);
});

test('retrieve the array of commands using `getCommands`', async (t) => {
  const cmds = getCommands();

  t.deepEqual(cmds, commands);
});
