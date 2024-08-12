import chalk from 'chalk';

// Log messages
export const logGreen = (message) => console.log(chalk.green(message));
export const logYellow = (message) => console.log(chalk.yellow(message));
export const logBlue = (message) => console.log(chalk.blue(message));
export const logError = (message, error) => console.error(chalk.red(message), error || '');