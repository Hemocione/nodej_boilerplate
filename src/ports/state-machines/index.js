/**
 * StateMachines  Namespace.
 * @namespace ports/state-machines
 *
 *
 * @description this namespace control state-machine api methods
 */

/**
 * Reference only imports (for documentation).
 */
// eslint-disable-next-line no-unused-vars
import { Model } from 'sequelize'

/**
 * library references
 */
import { createResource, deleteResource, getResource, updateResource } from './db.maria'

/***
 * repositories
 */

/**
 * @description sequelize repository for state machine
 *
 * @memberof ports/state-machines
 * @function
 * @param {Model} sequelize instance of model
 * @returns {SequelizeRepositoryInstance} instance of repository for database
 */
export const databaseRepository = (model) => {
  return {
    getResource: getResource(model),
    createResource: createResource(model),
    updateResource: updateResource(model),
    deleteResource: deleteResource(model)
  }
}

/***
 * type definitions for complex objects
 * this helps documentation
 */

/**
 * @typedef {Object} PayloadValue
 * @property {string} key  unique key on tuple
 * @property {EVariableType} type  type of the key for cast operations
 * @property {string} value value of the variable in payload
 */

/**
 * @typedef {Object} SequelizeRepositoryInstance
 *
 * @property {getResourceReturn} getResource function to get existing resource (instantiated).
 * @property {createResourceReturn} createResource function to create resource (instantiated).
 * @property {updateResourceReturn} updateResource function to update existing resource (instantiated).
 * @property {deleteResourceReturn} deleteResource function to delete existing resource (instantiated).
 */

/**
 * This callback is displayed as part of the getResource (inner SequelizeRepositoryInstance) function.
 *
 * @callback getResourceReturn
 * @param {string} key - object of keys table parameters to search
 * @returns {Object} - object updated from state-machine
 */

/**
 * This callback is displayed as part of the createResource (inner SequelizeRepositoryInstance) function.
 *
 * @callback createResourceReturn
 * @param {Object} item - object of keys table parameters to search
 */

/**
 * This callback is displayed as part of the getDocument (inner DynamoRepositoryInstance) function.
 *
 * @callback updateResourceReturn
 * @param {string} key - object of keys table parameters to search
 * @param {Object} item  object to persist
 * @returns {Object} - object updated from state-machine
 */

/**
 * This callback is displayed as part of the deleteDocument (inner DynamoRepositoryInstance) function.
 *
 * @callback deleteResourceReturn
 * @param {string} key - key of the data
 */
