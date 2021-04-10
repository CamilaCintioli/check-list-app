import sequelize from 'sequelize';
import { Table, Column, Model, AllowNull, Default } from 'sequelize-typescript';

@Table
export class Task extends Model {
  @Column
  name: string;

  @AllowNull(true)
  @Default(null)
  @Column(sequelize.DATE)
  completedAt: Date;
}
