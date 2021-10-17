/**
 * Reference only imports (for documentation).
 */
// eslint-disable-next-line no-unused-vars
import { Model, Sequelize } from 'sequelize'

/**
 * Code imports.
 */
import { dbConfig } from '../../config'
import { classError } from './constants'
import { EClassError, throwCustomError } from '../../utils'
import R from 'ramda'

/**
 * Config Sequelize.
 */
// eslint-disable-next-line no-unused-vars
export const SequelizeSqlite = new Sequelize(dbConfig.url, {
  dialect: 'mariadb',
  dialectOptions: { connectTimeout: 3000 }
})

// TODO - change to migrations for production apps
SequelizeSqlite.sync({ force: true })

/**
 * Sequelize custom methods.
 */

/**
 * Get a resource in Mariadb.
 *
 * @memberof ports/state-machines
 * @async
 * @function
 * @throws {CustomError}
 * @param {Model} model instance of sequelize model
 * @returns {getResourceReturn} Object searched from table
 */
export const getResource = (model) => async(id) => {
  try {
    const result = model.findByPk(id)

    return (R.not(R.isEmpty(result)) && R.not(R.isNil(result))) ? result : null
  } catch (error) {
    throwCustomError(error, 'state-machines.db.maria.getResource', classError.INTERNAL)
  }
}

/**
 * Insert resource in the MariaDB.
 *
 * @memberof ports/state-machines
 * @async
 * @function
 * @throws {CustomError}
 * @param {Model} model instance of sequelize model
 * @returns {createResourceReturn} Object searched from table
 */
export const createResource = (model) => async (item) => {
  try {
    return model.create(item)
  } catch (error) {
    throwCustomError(error, 'state-machines.db.maria.createResource', classError.INTERNAL)
  }
}

/**
 * Update resource in the MariaDB.
 *
 * @memberof ports/state-machines
 * @async
 * @function
 * @throws {CustomError}
 * @param {Model} model instance of sequelize model
 * @returns {updateResourceReturn} Object searched from table
 */
export const updateResource = (model) => async (id, item) => {
  const methodPath = 'state-machines.db.maria.updateResource'
  try {
    const resource = model.findByPk(id)
    if (!resource) {
      throwCustomError(new Error('resource not found!'), methodPath, EClassError.USER_ERROR)
    }

    return resource.update(item)
  } catch (error) {
    throwCustomError(error, methodPath, classError.INTERNAL)
  }
}

/**
 * Delete a resource in the MariaDB.
 *
 * @memberof ports/state-machines
 * @async
 * @function
 * @throws {CustomError}
 * @param {Model} model instance of sequelize model
 * @returns {deleteDocumentReturn} Object searched from table
 */
export const deleteResource = (model) => async(id) => {
  const methodPath = 'state-machines.db.maria.deleteResource'
  try {
    const resource = model.findByPk(id)
    if (!resource) {
      throwCustomError(new Error('resource not found!'), methodPath, EClassError.USER_ERROR)
    }

    await model.destroy()
    return { id: id }
  } catch (error) {
    throwCustomError(error, methodPath, classError.INTERNAL)
  }
}

/***
 * type definitions for complex objects
 * this helps documentation
 */

/**
 * This callback is displayed as part of the getResource (inner SequelizeRepositoryInstance) function.
 *
 * @callback getResourceReturn
 * @param {string} key - object of keys table parameters to search
 * @returns {Object} - object updated from state-machine
 */

/**
 * This callback is displayed as part of the putDocument (inner SequelizeRepositoryInstance) function.
 *
 * @callback createResourceReturn
 * @param {Object} item - object to persist
 */

/**
 * This callback is displayed as part of the updateDocument (inner SequelizeRepositoryInstance) function.
 *
 * @callback updateResourceReturn
 * @param {string} key - object of keys table parameters to search
 * @param {Object} item  values to be mapped in updateExpression expression
 * @returns {Object} - object updated
 */

/**
 * This callback is displayed as part of the deleteDocument (inner SequelizeRepositoryInstance) function.
 *
 * @callback deleteResourceReturn
 * @param {string} key - key of the data
 */
