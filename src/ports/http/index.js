/**
 * route http ports  Namespace.
 * @namespace ports/http
 *
 *
 * @description this namespace is part of port http
 */

import express from 'express'
import bodyParser from 'body-parser'
import { Todo } from '../state-machines/models/entity.todo'
import { databaseRepository } from '../state-machines'
import { adapter } from '../../adapters'
import { appConfig } from '../../config'
import { getRoutes } from './routes/index'
import { handleLogger } from '../logger'

// Setting app
const _app = express()

// Setting Escriba
const escriba = handleLogger(appConfig.appName, appConfig.envName)

// inject repositories
const databaseTodoRepoInstance = databaseRepository(Todo)
const adapterTodoInstance = adapter(escriba, databaseTodoRepoInstance)

_app.use(bodyParser.json({ limit: '50mb' }))
_app.use(bodyParser.urlencoded({ extended: false }))

export const app = getRoutes(escriba, adapterTodoInstance, _app)
