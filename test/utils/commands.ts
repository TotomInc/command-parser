import { Command } from '../../src/models/command.model';

const commands: Command[] = [
  {
    name: 'ssh',
    description: 'connect to another server which supports the SSH protocol',
    requireValue: true,
    validation: (value) => value.indexOf('@') > -1,
    arguments: [
      {
        name: '--identity_file',
        alias: '-i',
        requireValue: true,
        validation: (value) => value.indexOf('.ssh') > -1,
      },
      {
        name: '--login_name',
        alias: '-l',
        requireValue: true,
        possibilities: ['root', 'user', 'totominc'],
      },
      {
        name: '--force',
        alias: '-f',
        requireValue: false,
      },
    ],
  },
];

export default commands;
