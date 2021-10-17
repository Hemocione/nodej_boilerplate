/**
 * reference only imports (for documentation)
 */
// eslint-disable-next-line no-unused-vars
import { Todo, MutateTodoInput, MutateTodoOutput } from './index'

/**
 * code imports
 */
import { v4 as uuidv4 } from 'uuid'
import { toISOString } from './moment'
import { ETodoStatus, EPriority } from './constants'
import R from 'ramda'
import {
  EClassError,
  throwCustomError,
  // eslint-disable-next-line no-unused-vars
  CustomError
} from '../utils'

/**
 * @description Validate a Todo event on creation
 * @memberof domain
 * @function
 * @throws {CustomError}
 * @param {Todo} data input data for create task
 * @returns {Todo}
 */
export const validateCreateTodo = (data) => {
  const creationDate = toISOString()
  const methodPath = 'domain.todo.validateCreateTodo'

  if (R.isEmpty(data) || R.isNil(data)) {
    throwCustomError(new Error('invalid entry on field data, missing information'), methodPath, EClassError.USER_ERROR)
  }

  if (R.isEmpty(data.taskDescription) || R.isNil(data.taskDescription)) {
    throwCustomError(new Error('invalid entry on field data, missing information about description'), methodPath, EClassError.USER_ERROR)
  }

  if ((R.not(R.isNil(data.taskPriority)) && R.not(Object.values(EPriority).includes(data.taskPriority)))) {
    throwCustomError(new Error(`invalid value for priority: got ${data.taskPriority}`), methodPath, EClassError.USER_ERROR)
  }

  if ((R.not(R.isNil(data.taskStatus)) && R.not(Object.values(ETodoStatus).includes(data.taskStatus)))) {
    throwCustomError(new Error(`invalid value for status: got ${data.taskStatus}`), methodPath, EClassError.USER_ERROR)
  }

  return {
    // default values if is missing
    taskOrder: 0,
    taskPriority: EPriority.LOW,
    taskStatus: ETodoStatus.NEW,
    ...data,
    // information from system
    creationDate,
    id: uuidv4()
  }
}

/**
 * @description Validate a Todo event on update
 * @memberof domain
 * @function
 * @throws {CustomError}
 * @param {MutateTodoInput} data update task input
 * @param {Todo} originalData current task data
 * @returns {MutateTodoOutput}
 */
export const validateUpdateTodo = (data, originalData) => {
  const lastUpdateDate = toISOString()
  const methodPath = 'domain.todo.validateUpdateTodo'

  if (R.isNil(originalData)) {
    throwCustomError(new Error('no data for this id'), methodPath, EClassError.USER_ERROR)
  }

  if (R.isEmpty(data) || R.isNil(data)) {
    throwCustomError(new Error('invalid entry on field data, missing information'), methodPath, EClassError.USER_ERROR)
  }

  return ['id', 'creationDate']
    .reduce(
      (reducedData, field) => R.dissoc(field, reducedData),
      {
        ...originalData,
        ...data,
        lastUpdateDate
      }
    )
}

/**
 * @description Validate a Todo event on delete
 * @memberof domain
 * @function
 * @throws {CustomError}
 * @param {Todo} originalData current task data
 * @returns {Todo}
 */
export const validateDeleteTodo = (originalData) => {
  const methodPath = 'domain.todo.validateDeleteTodo'
  if (R.isNil(originalData)) {
    throwCustomError(new Error('no data for this id'), methodPath, EClassError.USER_ERROR)
  }

  return originalData
}
