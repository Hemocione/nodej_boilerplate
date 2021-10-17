/**
 * config  Namespace.
 * @namespace config
 *
 *
 * @description this namespace is a configuration of the project
 */
// eslint-disable-next-line no-unused-vars
import { Configuration as Log4jsConf } from 'log4js'

// code imports
import { config } from 'dotenv'
import { getEnv } from './environments'
config()

/**
 * moment configuration
 * @memberof config
 */
const momentConfig = {
  timezone: getEnv('TIMEZONE', 'America/Sao_Paulo')
}

const envProdName = 'production'

/**
 * general application configuration
 * @memberof config
 */
const appConfig = {
  appName: getEnv('APP_NAME', 'nodej_boilerplate'),
  isProduction: getEnv('NODE_ENV') === envProdName,
  envName: getEnv('NODE_ENV'),
  todo: {
    tableName: getEnv('MARIA_DB_TODO_TABLE_NAME', 'todos')
  }
}

/**
 * database configuration
 * @merberof config
 */
const dbConfig = {
  url: getEnv('DATABASE_URL')
}

/**
 * logger configuration fixed for all jobs
 * @memberof config
 */
const escribaConf = {
  sensitiveConf: {
    password: {
      paths: ['message.password'],
      pattern: /\w.*/g,
      replacer: '*'
    }
  },
  log4jsConf: {
    appenders: {
      out: {
        type: 'console',
        layout: {
          type: 'pattern',
          pattern: '[%d] %m'
        }
      }
    },
    categories: {
      default: {
        appenders: [
          'out'
        ],
        level: 'info'
      }
    }
  }
}

export {
  appConfig,
  dbConfig,
  escribaConf,
  envProdName,
  momentConfig
}
