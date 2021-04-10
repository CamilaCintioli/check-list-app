import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Task extends Model {
  @Column
  name: string;
}
