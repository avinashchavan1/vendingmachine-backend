import { Entity, Column, ManyToMany, PrimaryColumn } from "typeorm";
import { Beverage } from "./Beverage";

@Entity()
export class Ingredient {
  @PrimaryColumn()
  name: string;

  @Column()
  availableQuantity: number;

  @ManyToMany(() => Beverage, (beverage) => beverage.ingredients)
  beverages: Beverage[];
}
