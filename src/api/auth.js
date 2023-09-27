/**
 * Logs in a user with provided login form data.
 *
 * @param {Object} formData - User's login details with email and password.
 * @returns {Promise} Response data from the API.
 * @throws {Error} On unsuccessful login or network error.
 */
export const loginUser = async (formData) => {
  try {
    const response = await fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "An error occurred during login.");
    }

    return data;
  } catch (error) {
    throw new Error(
      error.message || "A network error occurred. Please try again."
    );
  }
};
