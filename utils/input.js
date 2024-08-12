import { logError, logGreen } from './logger.js';
import { getGlobal } from './globalState.js';

// Validators for the input
const validators = {
  date: (input) => !isNaN(Date.parse(input)),
  int: (input) => Number.isInteger(Number(input)),
  string: (input) => typeof input === 'string' && input.trim().length > 0,
};

// Validation messages
const validationMessages = {
  date: 'Please enter a valid date.',
  int: 'Please enter a valid integer.',
  string: 'Please enter a non-empty string.',
};

// Ask for input
export const askForInput = (question, validatorType) => {
  return new Promise((resolve) => {
    const ask = () => {
      getGlobal('rl').question(question, (input) => {
        const validator = validators[validatorType];
        if (validator && !validator(input)) {
          logError(validationMessages[validatorType] || 'Invalid input, please try again.');
          ask(); // Ask again if validation fails
        } else {
          resolve(input);
        }
      });
    };
    ask();
  });
};