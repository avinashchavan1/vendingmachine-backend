import express = require("express");
import { AppDataSource } from "../data-source";
import { Beverage } from "../entity/Beverage";
import { Ingredient } from "../entity/Ingredient";
const router = express.Router();
router.get(
  "/status",
  async (req: express.Request, res: express.Response, next: any) => {
    const ingredientRepository = AppDataSource.getRepository(Ingredient);
    const result = await ingredientRepository
      .createQueryBuilder("ingredient")
      .getMany();
    res.status(200).json(result);
  }
);

router.post(
  "/dispense",
  async (req: express.Request, res: express.Response, next: any) => {
    const beverageName = req.body.name;
    const beverageIngredients = req.body.ingredients;
    console.log(beverageName);
    if (beverageName.toString().trim() === "") {
      return res.status(400).json({ message: `No beverage specified` });
    }
    const beverageRepository = AppDataSource.getRepository(Beverage);
    const ingredientRepository = AppDataSource.getRepository(Ingredient);

    const beverage = await beverageRepository.findOneBy({
      name: beverageName as string,
    });
    if (beverage === null) {
      return res
        .status(404)
        .json({ message: `No beverage with ${beverageName} found` });
    }
    const ingredientList = beverage.ingredients;

    // Validation if the beverage can be dispensed
    for (const element of beverageIngredients) {
      const currentIngredient = await ingredientRepository.findOneBy({
        name: element.name,
      });
      if (currentIngredient === null) {
        return res
          .status(404)
          .json({ message: `No Ingredient with ${element.name} found` });
      }
      if (currentIngredient.availableQuantity < element.quantity) {
        return res.status(400).json({
          message: `${element.name} is not suffecient to dispense ${beverageName}`,
        });
      }
    }
    // Reduce ingredient quantities
    for (const element of beverageIngredients) {
      const currentIngredient = await ingredientRepository.findOneBy({
        name: element.name,
      });
      currentIngredient.availableQuantity -= element.quantity;
      await ingredientRepository.save(currentIngredient);
    }

    await beverageRepository.save(beverage);
    console.log(beverage);
    res
      .json({ status: "Success", message: `${beverageName} dispened` })
      .status(200);
  }
);
export default router;
