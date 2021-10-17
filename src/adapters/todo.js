/**
 * Reference only imports (for documentation)
 */
// eslint-disable-next-line no-unused-vars
import { Logger } from 'log4js'
// eslint-disable-next-line no-unused-vars
import { SequelizeRepositoryInstance } from '../ports/state-machines'
// eslint-disable-next-line no-unused-vars
import { Todo } from '../domain'

/**
 * code imports
 */
import {
  // eslint-disable-next-line no-unused-vars
  CustomError,
  EClassError,
  throwCustomError
} from '../utils'
// import { deleteResource, updateResource } from '../ports/state-machines/db.maria';

/**
 * @description Todo adapter factory
 * @memberof adapters
 * @function
 * @param {Logger} escriba instance of escriba logger
 * @param {SequelizeRepositoryInstance} repository state-machine database methods
 * @returns {TodoAdapter} todo adapter instantiated
 */
const todoAdapterFactory = (escriba, repository) => ({
  getTodo: getTodo(repository),
  createTodo: createTodo(repository),
  updateTodo: updateTodo(escriba, repository),
  deleteTodo: deleteTodo(escriba, repository)
})

export default todoAdapterFactory

/**
 * @description Handler function to get todo data by id .
 * @memberof adapters
 * @async
 * @function
 * @throws {CustomError}
 * @param {SequelizeRepositoryInstance} repository - State-machine database methods.
 * @returns {getTodoReturn} GetResource method ready to execute.
 */
const getTodo = (repository) => async (id) => {
  const methodPath = 'adapters.todo.getTodo'
  try {
    return await repository.getResource(id)
  } catch (error) {
    throwCustomError(error, methodPath, EClassError.INTERNAL)
  }
}

/**
 * @description Create todo.
 * @memberof adapters
 * @async
 * @function
 * @throws {CustomError}
 * @param {Logger} escriba instance of escriba
 * @param {SequelizeRepositoryInstance} repository state-machine database methods
 * @returns {createTodoReturn} function to call createTodo direct
 */
const createTodo = (escriba, repository) => async (item) => {
  const methodPath = 'adapters.todo.createTodo'
  try {
    const task = await repository.createResource(item)
    escriba.info({
      action: 'TASK_CREATED',
      method: methodPath,
      data: { task }
    })

    return task
  } catch (error) {
    throwCustomError(error, methodPath, EClassError.INTERNAL)
  }
}

/**
 * @description Update todo.
 * @memberof adapters
 * @async
 * @function
 * @throws {CustomError}
 * @param {Logger} escriba instance of escriba
 * @param {SequelizeRepositoryInstance} repository state-machine database methods
 * @returns {updateTodoReturn} function to call updateTodo direct
 */
const updateTodo = (escriba, repository) => async (id, item) => {
  const methodPath = 'adapters.todo.updateTodo'
  try {
    const task = await repository.updateResource(id, item)

    escriba.info({
      action: 'TASK_UPDATED',
      method: methodPath,
      data: task
    })

    // return updated item
    return task
  } catch (error) {
    throwCustomError(error, methodPath, EClassError.INTERNAL)
  }
}

/**
 * @description delete todo.
 * @memberof adapters
 * @async
 * @function
 * @throws {CustomError}
 * @param {Logger} escriba instance of escriba
 * @param {SequelizeRepositoryInstance} repository state-machine database methods
 * @returns {deleteTodoReturn} function to call deleteTodo direct
 */
const deleteTodo = (escriba, repository) => async (id) => {
  const methodPath = 'adapters.todo.deleteTodo'
  try {
    await repository.deleteResource(id)

    // log report data
    escriba.info({
      action: 'TASK_DELETED',
      method: methodPath,
      data: id
    })

    return id
  } catch (error) {
    throwCustomError(error, methodPath, EClassError.INTERNAL)
  }
}

/**
 * complex callbacks documentation
 *
 */

/**
 * @typedef {Object} TodoAdapter
 * @property {getTodoReturn} getTodo function to get task by id (instantiated)
 * @property {createTodoReturn} createTodo function to generate task (instantiated).
 * @property {updateTodoReturn} updateTodo function to update task  (instantiated).
 * @property {deleteTodoReturn} deleteTodo function to delete task (instantiated).
 */

/**
 * This callback is displayed as part of the createTodo function.
 * @memberof adapters
 * @callback createTodoReturn
 * @param {Object} item input param for createTodo
 * @returns {Promise<Todo>} new report data
 */

/**
 * This callback is displayed as part of the updateTodo function.
 * @memberof adapters
 * @callback updateTodoReturn
 * @param {string} id id of the current data for update
 * @param {Object} item input param for updateTodo
 * @returns {Promise<Todo>} new report data
 */

/**
 * This callback is displayed as part of the deleteTodo function.
 * @memberof adapters
 * @callback deleteTodoReturn
 * @param {string} id id of the current data for update
 * @returns {Promise<id>} new report data
 */
/**
 * This callback is displayed as part of the getTodo function.
 * @memberof adapters
 * @callback getTodoReturn
 * @param {string} id key of the data
 * @returns {Promise<Todo>} task from repository
 */
