import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  PrimaryColumn,
} from "typeorm";
import { Ingredient } from "./Ingredient";
@Entity()
export class Beverage {
  @PrimaryColumn()
  name: string;

  @ManyToMany(() => Ingredient, (ingredient) => ingredient.beverages) // note: we will create author property in the Photo class below
  @JoinTable()
  ingredients: Ingredient[];
}
