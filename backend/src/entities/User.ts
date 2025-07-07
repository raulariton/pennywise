import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * NOTE:
 * The `!` after each column indicates
 * that the column will be assigned a value at runtime,
 * i.e. non-nullable.
 */
/**
 * User entity represents a user in the system.
 */
@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ unique: true, nullable: true })
  username?: string;

  @Column({ nullable: true })
  name!: string;

  @CreateDateColumn()
  createdAt!: Date;
}