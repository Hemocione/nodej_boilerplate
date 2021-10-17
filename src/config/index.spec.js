import { appConfig, momentConfig, escribaConf, envProdName } from './index'

describe('config', () => {
  test('momentConfig', () => {
    expect(momentConfig).toHaveProperty('timezone', 'America/Sao_Paulo')
  })
  test('envProdName', () => {
    expect(envProdName).toBe('production')
  })
  test('appConfig', () => {
    expect(appConfig).toHaveProperty('appName', 'nodejs-boilerplate')
    expect(appConfig).toHaveProperty('isProduction', false)
    expect(appConfig.isProduction).not.toBeUndefined()
    expect(appConfig.isProduction).not.toBeNull()
    expect(appConfig).toHaveProperty('envName', 'test')
    expect(appConfig).toHaveProperty('todo')
    expect(appConfig.todo).toHaveProperty('tableName', 'todos')
  })
  test('escribaConf', () => {
    expect(escribaConf).toHaveProperty('log4jsConf')
    expect(escribaConf.log4jsConf).toHaveProperty('appenders')
    expect(escribaConf.log4jsConf.appenders).toHaveProperty('out', {
      type: 'console',
      layout: {
        type: 'pattern',
        pattern: '[%d] %m'
      }
    })
    expect(escribaConf.log4jsConf.categories).toHaveProperty('default', {
      appenders: [
        'out'
      ],
      level: 'info'
    })
    expect(escribaConf).toHaveProperty('sensitiveConf')
    expect(escribaConf.sensitiveConf).toHaveProperty('password', {
      paths: ['message.password'],
      pattern: /\w.*/g,
      replacer: '*'
    })
  })
})
