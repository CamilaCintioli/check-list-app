import { Sequelize } from 'sequelize-typescript';
import constants from './constants';
import { Task } from './task.entity';

export const databaseProviders = [
  {
    provide: constants.sequelize,
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3307,
        username: 'root',
        password: 'password',
        database: 'nest',
      });
      sequelize.addModels([Task]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
