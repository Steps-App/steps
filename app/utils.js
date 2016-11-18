// Check whether script is being run in browser or Node
export const isBrowser = () => {
  try {
    return window;
  } catch (e) {
    return false;
  }
}

// Return formatted full name of user
export const fullName = user => `${user.first_name} ${user.last_name}`;
