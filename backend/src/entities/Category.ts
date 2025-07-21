import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // TODO: how will we handle localization?
  //  for now, we use English names
  //  and the frontend will handle translations
  //  in the future, we can use a library like i18next
  @Column({ unique: true })
  name!: string;

  // optional description for the category
  @Column({ nullable: true })
  description?: string;
}