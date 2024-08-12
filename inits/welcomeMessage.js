import { logGreen } from '../utils/logger.js';

// Welcome message
export const initTask = async () => {
logGreen(`
===============================================================
+ Welcome to AppName
+ Author: Your Name
+ Description: 
===============================================================
`);
};

// Assign a priority to this task
export const priority = 1000;