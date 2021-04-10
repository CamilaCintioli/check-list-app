import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import constants from './constants';
import { Task } from './task.entity';

export const databaseProviders = [
  {
    provide: constants.sequelize,
    inject: [],  
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'db',
        port: 3306,
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
