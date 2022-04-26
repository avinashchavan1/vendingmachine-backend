import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Ingredient } from "./Ingredient";
@Entity()
export class Beverage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  availableQuantity: number;

  @ManyToMany(() => Ingredient, (ingredient) => ingredient.beverages) // note: we will create author property in the Photo class below
  @JoinTable()
  ingredients: Ingredient[];
}
