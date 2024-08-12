import fs from 'fs';
import path from 'path';
import { logError } from './utils/logger.js';

// Load the commands
export const loadCommands = async () => {
  const commands = {};
  const commandFiles = fs.readdirSync(path.resolve('./commands'));

  // If no commands are found, return an empty object
  if (commandFiles.length === 0) {
    logError('No commands found. Please add commands to use this app.');
    process.exit(1); // Exit the app with a failure code
  }

  for (const file of commandFiles) {
    const { commandInfo, handle } = await import(`./commands/${file}`);

    // Validate the command
    if (!commandInfo.name || typeof handle !== 'function') {
      logError(`Invalid command in file: ${file}. Each command must have a name and a handle function.`);
      process.exit(1); // Exit the app with a failure code
    }

    commands[commandInfo.name] = { 
      handle, 
      usage: commandInfo.usage || '', 
      description: commandInfo.description || '' 
    };
  }

  return commands;
};