import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Ingredient } from "./entity/Ingredient";
import { Beverage } from "./entity/Beverage";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "Root@1234",
  database: "vendingapp",
  synchronize: true,
  logging: false,
  entities: [Ingredient, Beverage],
  migrations: [],
  subscribers: [],
});
