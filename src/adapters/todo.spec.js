import { getResource, createResource } from '../ports/state-machines/db.maria'
import todoAdapterFactory from './todo'
import { ETodoStatus, EPriority } from '../domain/constants'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import { throwCustomError, EClassError } from '../utils'

/** mock error generation to validate signature */
jest.mock('../utils/errors')

throwCustomError.mockImplementation((error) => {
  throw error
})

// this adapter will mock all methods from db.sqlite port
jest.mock('../ports/state-machines/db.maria')

// mock escriba calls
const escribaMock = {
  info: jest.fn((args) => (args)).mockReturnValue(undefined)
}

// mock repository structure to test your elements
const repositoryMock = {
  getResource,
  createResource
}

// mock instantiated adapter
const adapterInstantiated = todoAdapterFactory(escribaMock, repositoryMock)

describe('getTodo', () => {
  const methodPath = 'adapters.todo.getTodo'
  beforeEach(() => {
    getResource.mockReset()
  })

  const getResourceMock = (args) => jest.fn().mockResolvedValue({
    id: args,
    taskOrder: 0,
    taskDescription: 'mockTaskDescription',
    taskOwner: 'owner',
    taskStatus: ETodoStatus.IN_PROGRESS,
    taskPriority: EPriority.MODERATE,
    creationDate: moment().toISOString(),
    lastUpdateDate: null
  })

  const newId = uuidv4()

  test('default case', async () => {
    repositoryMock.getResource.mockImplementationOnce((args) => getResourceMock(args)())

    await expect(adapterInstantiated.getTodo(newId))
      .resolves.toMatchObject({
        id: newId,
        taskOrder: 0,
        taskDescription: 'mockTaskDescription',
        taskOwner: 'owner',
        taskStatus: ETodoStatus.IN_PROGRESS,
        taskPriority: EPriority.MODERATE
      })
    expect(getResource).toHaveBeenCalled()
    expect(getResource).toHaveBeenLastCalledWith(newId)
  })

  test('throw error', async () => {
    const throwMessage = 'invalid id'
    const getResourceErrorMock = (args) => jest.fn().mockRejectedValue(new Error(throwMessage))
    repositoryMock.getResource.mockImplementationOnce((args) => getResourceErrorMock(args)())

    await expect(adapterInstantiated.getTodo(newId)).rejects.toThrow(throwMessage)
    expect(throwCustomError).toHaveBeenCalledWith(new Error(throwMessage), methodPath, EClassError.INTERNAL)
    expect(getResource).toHaveBeenCalled()
    expect(getResource).toHaveBeenLastCalledWith(newId)
  })
})

describe('createTodo', () => {
  const methodPath = 'adapters.todo.createTodo'
  beforeEach(() => {
    createResource.mockReset()
  })

  const createResourceMock = (args) => jest.fn().mockResolvedValue(args)

  const newData = {
    taskOrder: 0,
    taskDescription: 'testDescription',
    taskPriority: EPriority.HIGH
  }

  test('default case', async () => {
    repositoryMock.createResource.mockImplementationOnce((args) => createResourceMock(args)())
    const insertedData = await adapterInstantiated.createTodo(newData)

    expect(insertedData).toMatchObject({
      ...newData,
      taskStatus: ETodoStatus.NEW,
      taskOwner: 'owner'
    })
    expect(createResource).toHaveBeenCalled()
    expect(createResource).toHaveBeenLastCalledWith(insertedData)
    expect(escribaMock.info).toHaveBeenCalled()
    expect(escribaMock.info).toHaveBeenCalledWith({
      action: 'TASK_CREATED',
      method: methodPath,
      data: { documentInserted: insertedData }
    })
  })

  test('throw error', async () => {
    const throwMessage = 'invalid data'
    const createResourceErrorMock = (args) => jest.fn().mockRejectedValue(new Error(throwMessage))
    repositoryMock.createResource.mockImplementationOnce((args) => createResourceErrorMock(args)())
    await expect(adapterInstantiated.createTodo(newData)).rejects.toThrow(throwMessage)
    expect(throwCustomError).toHaveBeenCalledWith(new Error(throwMessage), methodPath, EClassError.INTERNAL)
    expect(createResource).toHaveBeenCalled()
  })

  test('throw error with invalid data (domain validation)', async () => {
    repositoryMock.createResource.mockImplementationOnce((args) => createResourceMock(args)())
    await expect(adapterInstantiated.createTodo({})).rejects.toThrow()
    expect(createResource).not.toHaveBeenCalled()
  })
})
