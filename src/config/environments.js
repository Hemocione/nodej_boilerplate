/**
 * get environment variable
 * @memberof config
 * @param {string} env environment variable name
 * @param {string} [value=''] default value
 * @returns {string} environment variable value
 */
export const getEnv = (env, value = '') => process.env[env] || value
