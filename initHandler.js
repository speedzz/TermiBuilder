import fs from 'fs';
import path from 'path';

// Load the initialization tasks
export const loadInitTasks = async () => {
  const initTasks = [];
  const initFiles = fs.readdirSync(path.resolve('./init'));

  for (const file of initFiles) {
    const { initTask, priority = -Infinity } = await import(`./init/${file}`);

    // Validation
    if (typeof initTask !== 'function') {
      console.error(`Invalid initTask in file: ${file} skipping...`);
      continue;
    }

    initTasks.push({ task: initTask, priority });
  }

  // Sort tasks by priority (higher priority first, default low priority last)
  initTasks.sort((a, b) => b.priority - a.priority);

  return initTasks.map(item => item.task);
};