/**
 * Adapters  Namespace.
 * @namespace adapters
 *
 *
 * @description this namespace control communication between domain and state-machines
 */

/**
 * @typedef {Object} Adapter
 * @property {TodoAdapter} todo todo adapter instantied
 */

// eslint-disable-next-line no-unused-vars
import { SequelizeRepositoryInstance } from '../ports/state-machines'
// code imports
import todoAdapterFactory,
// eslint-disable-next-line no-unused-vars
{ TodoAdapter } from './todo'

/**
 * @description sequelize repository for state machine
 *
 * @memberof ports/state-machines
 * @function
 * @param {Logger} escriba - Instance of escriba.
 * @param {SequelizeRepositoryInstance} repository repository instantiated
 * @returns {Adapter}
 */
export const adapter = (escriba, repository) => {
  return {
    todo: todoAdapterFactory(escriba, repository)
  }
}
