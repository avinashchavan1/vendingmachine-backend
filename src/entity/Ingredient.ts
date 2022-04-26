import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Beverage } from "./Beverage";

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  availableQuantity: number;

  @ManyToMany(() => Beverage, (beverage) => beverage.ingredients)
  beverages: Beverage[];
}
