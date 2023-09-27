/**
 * Validates an email address.
 *
 * @param {string} email - Email address
 * @returns {boolean} True if the email is valid, otherwise false.
 */
export const validateEmail = (email) => {
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return pattern.test(email);
};
