import { getGlobal } from '../utils/globalState.js';

export const commandInfo = {
    name: 'exit',
    usage: '',
    description: 'Exit the application'
};

export const handle = () => {
  const name = getGlobal('name');
  console.log(`Goodbye ${name}!`);
  getGlobal('rl').close();
};