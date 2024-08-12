import { logGreen, logError } from '../utils/logger.js';
import { getGlobal, setGlobal } from '../utils/globalState.js';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs';
import { askForInput } from '../utils/input.js';

export const commandInfo = {
    name: 'example',
    usage: '[--name=value]',
    description: 'This is an example command'
};

export const handle = async (args, line) => { 
    const argv = yargs(hideBin(line)).argv;
    const name = argv.name || await askForInput('What is your name?');

    //you can set global state here to use in other commands
    setGlobal('name', name);

    logGreen(`Example command This is an example command: ${name}`);
};
