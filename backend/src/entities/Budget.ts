// src/entities/budget-plan.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from './Category';
import { User } from './User';

@Entity('budgets')
export class BudgetPlan {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // Planned budget amount for this category
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount!: number;

  // Which category this budget applies to
  @ManyToOne(() => Category)
  @JoinColumn({ name: 'categoryId', referencedColumnName: 'id' })
  category!: Category;

  @Column({ type: 'date' })
  month!: Date;

  // Which user owns this plan
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user!: User;
}
