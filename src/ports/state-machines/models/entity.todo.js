import { DataTypes, Model } from 'sequelize'
import { SequelizeSqlite } from '../db.maria'
import { ETodoStatus, EPriority } from '../../../domain/constants'

export class Todo extends Model {}

Todo.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  taskOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  taskDescription: {
    type: DataTypes.STRING,
    allowNull: false
  },
  taskStatus: {
    type: DataTypes.STRING,
    defaultValue: ETodoStatus.NEW
  },
  taskPriority: {
    type: DataTypes.STRING,
    defaultValue: EPriority.LOW
  }
}, {
  sequelize: SequelizeSqlite,
  modelName: 'Todo',
  timestamps: true,
  createdAt: 'creationDate',
  updatedAt: 'lastUpdateDate'
})
