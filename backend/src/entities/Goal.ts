// entities/FinancialGoal.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

@Entity()
export class FinancialGoal {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column('decimal', { precision: 12, scale: 2 })
  targetAmount!: number;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  currentAmount!: number;

  @Column({ type: 'date', nullable: true })
  dueDate!: Date | null;

  // Unidirectional relation to User
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
