import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ unsigned: true })
  userID: number;

  @Column({ length: 50, unique: true })
  mail: string;

  @Column({ length: 150 })
  pass: string;
}
