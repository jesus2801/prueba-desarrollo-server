import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn({ unsigned: true })
  saleId: number;

  @Column()
  cost: number;

  @Column()
  price: number;

  @Column()
  client: string;

  @Column()
  commission: number;
}
