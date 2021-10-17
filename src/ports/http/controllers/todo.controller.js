// eslint-disable-next-line no-unused-vars
import { Logger } from 'log4js'
// eslint-disable-next-line no-unused-vars
import { Adapter } from '../../../adapters'
// eslint-disable-next-line no-unused-vars
import { ControllerTodoReturn } from './index'

/**
 * @description Get Task by id
 *
 * @memberof ports/http/controllers
 * @param {Logger} escriba instance of escriba
 * @param {Adapter} adapter adapter instantiated
 * @returns {ControllerTodoReturn}
 */
export const getTodo = (escriba, adapter) => async (req, _res, _next) => {
  try {
    return await adapter.todo.getTodo(req.params.id)
  } catch (error) {
    escriba.error('api.controller.todo.getTodo', error)
    throw error
  }
}

/**
 * @description Create Task
 *
 * @memberof ports/http/controllers
 * @param {Logger} escriba instance of escriba
 * @param {Adapter} adapter adapter instantiated
 * @returns {ControllerTodoReturn}
 */
export const createTodo = (escriba, adapter) => async (req, _res, _next) => {
  try {
    /**
     * TODO validate body
     */

    return await adapter.todo.createTodo(req.body.data)
  } catch (error) {
    escriba.error('api.controller.todo.createTodo', error)
    throw error
  }
}

/**
 * @description Update Task
 *
 * @memberof ports/http/controllers
 * @param {Logger} escriba instance of escriba
 * @param {Adapter} adapter adapter instantiated
 * @returns {ControllerTodoReturn}
 */
export const updateTodo = (escriba, adapter) => async (req, _res, _next) => {
  try {
    /**
     * TODO validate body
     */
    return await adapter.todo.updateTodo(req.params.id, req.body.data)
  } catch (error) {
    escriba.error('api.controller.todo.updateTodo', error)
    throw error
  }
}

/**
 * @description Delete Task
 *
 * @memberof ports/http/controllers
 * @param {Logger} escriba instance of escriba
 * @param {Adapter} adapter adapter instantiated
 * @returns {controllerTodoReturn}
 */
export const deleteTodo = (escriba, adapter) => async (req, _res, _next) => {
  try {
    return await adapter.todo.deleteTodo(req.params.id)
  } catch (error) {
    escriba.error('api.controller.todo.deleteTodo', error)
    throw error
  }
}
