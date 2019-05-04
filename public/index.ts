import parse, { Command, autocomplete } from '../src';

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

const { command, parsedArgs, valid } = parse('ssh -i ~/.ssh/key user@rpi', commands);

console.log(command, parsedArgs, valid);

const suggestions = autocomplete('s', commands);

console.log('autocomplete suggestion(s)', suggestions);

// expose our local variables to the global window object
window['commands'] = commands;
window['parse'] = parse;
window['autocomplete'] = autocomplete;
