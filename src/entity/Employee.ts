import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn({ unsigned: true })
  employeeId: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  cc: string;

  @Column()
  potisiton: string;
}