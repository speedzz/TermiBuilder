import readline from 'readline';
import { config } from './config.js';
import { loadCommands } from './commandHandler.js';
import { loadInitTasks } from './initHandler.js';
import { logGreen, logError, logYellow } from './utils/logger.js';
import { setGlobal, getGlobal } from './utils/globalState.js';

// Create a readline interface with the prompt name from the config
const createReadlineInterface = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: config.promptName
  });
  setGlobal('rl', rl);
  return rl;
};

// Setup the readline events
const setupReadlineEvents = (commands) => {
  getGlobal('rl').on('line', async (line) => {
    const [command, ...args] = line.trim().split(' ');

    // If the command exists, execute it
    if (commands[command]) {
      try {
        await commands[command].handle(args, line);
      } catch (err) {
        logError(`Error executing command: ${command}`, err);
      }
    } else {
      logError(`Unknown command: ${command}\n`);
    }

    console.log();
    getGlobal('rl').prompt();
  }).on('close', () => {
    logGreen('Exiting.');
    process.exit(0);
  });
};

// Initialize the app
export const initializeApp = async () => {
  const rl = createReadlineInterface();
  setGlobal('rl', rl);

  // Load the commands
  let commands;
  try {
    commands = await loadCommands();
  } catch (err) {
    logError('Error loading commands:', err);
    process.exit(1);
  }

  // Load the initialization tasks
  let initTasks;
  try {
    initTasks = await loadInitTasks();
  } catch (err) {
    logError('Error loading initialization tasks:', err);
    process.exit(1);
  }

  // Execute the initialization tasks
  for (const task of initTasks) {
    try {
      await task();
    } catch (err) {
      logError('Error executing initialization task:', err);
    }
  }


  if (config.showAvailableCommands) {
    logGreen('Available commands:\n');
    Object.keys(commands).forEach(command => {
      logGreen(`  - ${command} ${commands[command].usage}`);
      logYellow(`    ${commands[command].description}`);
      console.log();
    });
  }
  console.log();

  getGlobal('rl').prompt();

  // Setup the readline events
  setupReadlineEvents(commands);
};