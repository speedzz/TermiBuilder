// Global state for the app
const globalState = {
  rl: null,
};

// Get and set the global state
export const getGlobal = (key) => globalState[key];
export const setGlobal = (key, value) => {
  globalState[key] = value;
};

export default globalState;