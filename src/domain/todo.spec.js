import { EPriority, ETodoStatus } from './constants'
import { validateCreateTodo, validateUpdateTodo, validateDeleteTodo } from './todo'
import { throwCustomError, EClassError } from '../utils'

/** mock error generation to validate signature */
jest.mock('../utils/errors')

throwCustomError.mockImplementation((error) => {
  throw error
})

describe('validateCreateTodo', () => {
  const methodPath = 'domain.todo.validateCreateTodo'
  const validateCaseDefault = {
    taskDescription: 'test'
  }

  test('validate default case', () => {
    expect(validateCreateTodo(validateCaseDefault)).toMatchObject({
      ...validateCaseDefault,
      taskStatus: ETodoStatus.NEW,
      taskPriority: EPriority.LOW,
      taskOrder: 0
    })
  })

  const validateCasePriorityInvalid = {
    taskOrder: 1,
    taskDescription: 'test',
    taskPriority: 'INVALID'
  }

  test('validate invalid taskPriority', () => {
    const throwMessage = `invalid value for priority: got ${validateCasePriorityInvalid.taskPriority}`
    expect(() => {
      validateCreateTodo(validateCasePriorityInvalid)
    }).toThrow(throwMessage)
    expect(throwCustomError).toHaveBeenCalledWith(new Error(throwMessage), methodPath, EClassError.USER_ERROR)
  })

  const validateCaseStatusInvalid = {
    taskOrder: 1,
    taskDescription: 'test',
    taskStatus: 'INVALID'
  }

  test('validate invalid taskStatus on create', () => {
    const throwMessage = `invalid value for status: got ${validateCaseStatusInvalid.taskStatus}`
    expect(() => {
      validateCreateTodo(validateCaseStatusInvalid)
    }).toThrow(throwMessage)
    expect(throwCustomError).toHaveBeenCalledWith(new Error(throwMessage), methodPath, EClassError.USER_ERROR)
  })

  const validateNullDescription = {
    taskOrder: 1
  }

  test('validate null description on create', () => {
    const throwMessage = 'invalid entry on field data, missing information about description'
    expect(() => {
      validateCreateTodo(validateNullDescription)
    }).toThrow(throwMessage)
    expect(throwCustomError).toHaveBeenCalledWith(new Error(throwMessage), methodPath, EClassError.USER_ERROR)
  })

  const validateNullData = null

  test('validate null data on create', () => {
    const throwMessage = 'invalid entry on field data, missing information'
    expect(() => {
      validateCreateTodo(validateNullData)
    }).toThrow(throwMessage)
    expect(throwCustomError).toHaveBeenCalledWith(new Error(throwMessage), methodPath, EClassError.USER_ERROR)
  })
})

describe('validateUpdateTodo', () => {
  const methodPath = 'domain.todo.validateUpdateTodo'
  const defaultOriginalData = validateCreateTodo({
    taskPriority: EPriority.HIGH,
    taskDescription: 'updateDefault'
  })

  const validateCaseDefaultUpdate = {
    ...defaultOriginalData,
    taskStatus: ETodoStatus.IN_PROGRESS
  }

  test('validate null originalData on update', () => {
    const throwMessage = 'no data for this id'
    expect(() => {
      validateUpdateTodo(validateCaseDefaultUpdate)
    }).toThrow(throwMessage)
    expect(throwCustomError).toHaveBeenCalledWith(new Error(throwMessage), methodPath, EClassError.USER_ERROR)
  })

  test('validate data when is null for update', () => {
    const throwMessage = 'invalid entry on field data, missing information'
    expect(() => {
      validateUpdateTodo(null, defaultOriginalData)
    }).toThrow(throwMessage)
    expect(throwCustomError).toHaveBeenCalledWith(new Error(throwMessage), methodPath, EClassError.USER_ERROR)
  })

  test('validate normal update', () => {
    const validateCaseNormal = {
      ...defaultOriginalData,
      taskDescription: 'new description',
      taskStatus: ETodoStatus.IN_PROGRESS,
      taskPriority: EPriority.MODERATE
    }
    const updatedData = validateUpdateTodo(validateCaseNormal, defaultOriginalData)
    expect(updatedData)
      .toMatchObject({
        taskDescription: 'new description',
        taskStatus: ETodoStatus.IN_PROGRESS,
        taskPriority: EPriority.MODERATE
      })

    expect(updatedData.lastUpdateDate)
      .not.toBe(null)
    expect(updatedData)
      .not.toHaveProperty('id')
  })
})

describe('validateDeleteTodo', () => {
  const methodPath = 'domain.todo.validateDeleteTodo'
  const defaultOriginalData = validateCreateTodo({
    taskPriority: EPriority.HIGH,
    taskDescription: 'deleteDefault'
  })

  test('validate null originalData on update', () => {
    const throwMessage = 'no data for this id'
    expect(() => {
      validateDeleteTodo(null)
    }).toThrow(throwMessage)
    expect(throwCustomError).toHaveBeenCalledWith(new Error(throwMessage), methodPath, EClassError.USER_ERROR)
  })

  test('validate normal delete', () => {
    expect(validateDeleteTodo(defaultOriginalData))
      .toMatchObject(defaultOriginalData)
  })
})
