import { Command } from '../../src/models/command.model';

// List of directories to use for `syslog` command
const directories = ['~', '/home/admin'];

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
  {
    name: 'say',
    description: 'convert text to audible speech',
    requireValue: true,
    possibilities: ['hello', 'world', 'word'],
  },
  {
    name: 'syslog',
    description: 'output the log of the system since it have been startup',
    requireValue: true,
    possibilities: () => directories.map((directory) => `${directory}/system.log`),
  },
  {
    name: 'softwareupdate',
    description: 'update all development softwares',
    requireValue: false,
  },
];

export default commands;
