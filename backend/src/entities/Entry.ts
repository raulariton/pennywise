import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Category } from '@entities/Category';
import { User } from '@entities/User';

export enum EntryType {
  INCOME = "income",
  EXPENSE = "expense",
}

@Entity("entries")
export class Entry {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    type: "enum",
    enumName: "EntryType",
    enum: EntryType,
  })
  type!: EntryType;

  @Column()
  amount!: number;

  // a selection of "supported" currencies will be on the frontend
  // we will use an API for any currency conversion operations
  @Column()
  currency!: string;

  // optional note for the entry
  @Column({ nullable: true })
  description?: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  timestamp!: Date;

  @Column({ type: "uuid" })
  userId!: string; // foreign key to the User entity

  @OneToOne(() => Category)
  @JoinColumn({
    name: "categoryId",
    referencedColumnName: "id"
  })
  category!: Category; // foreign key to the Category entity

  @ManyToOne(() => User)
  @JoinColumn({
    name: "userId",
    referencedColumnName: "id"
  })
  user!: User; // relationship to the User entity
}