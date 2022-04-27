import { Entity, ManyToMany, JoinTable, PrimaryColumn } from "typeorm";
import { Ingredient } from "./Ingredient";

@Entity()
export class Beverage {
  @PrimaryColumn()
  name: string;

  @ManyToMany((type) => Ingredient, (ingredient) => ingredient.beverages, {
    eager: true,
  })
  @JoinTable()
  ingredients: Ingredient[];
}
