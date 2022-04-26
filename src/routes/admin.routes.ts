import express = require("express");
import { AppDataSource } from "../data-source";
import { Beverage } from "../entity/Beverage";
import { Ingredient } from "../entity/Ingredient";
const router = express.Router();
router.get(
  "/test",
  (req: express.Request, res: express.Response, next: any) => {
    res.json({ Message: "From Admin" }).status(200);
  }
);

router.post(
  "/topup",
  async (req: express.Request, res: express.Response, next: any) => {
    const ingredients = req.body;
    const ingredientRepository = AppDataSource.getRepository(Ingredient);

    for (const key in ingredients) {
      const ingredientName = key;
      const quantity = +ingredients[key];
      const currentIngredient = await ingredientRepository.findOneBy({
        name: ingredientName,
      });
      if (currentIngredient === null) {
        const newIngredient = new Ingredient();
        newIngredient.name = ingredientName;
        newIngredient.availableQuantity = quantity;
        await ingredientRepository.save(newIngredient);
      } else {
        currentIngredient.availableQuantity += quantity;
        await ingredientRepository.save(currentIngredient);
        console.log(currentIngredient);
      }
    }
    res.json(ingredients).status(201);
  }
);

router.post(
  "/add-beverage",
  async (req: express.Request, res: express.Response, next: any) => {
    const beverageName = req.body.beverageName;
    const beverageIngredients = req.body.ingredients;
    const ingredientRepository = AppDataSource.getRepository(Ingredient);
    const ingredientList = [];
    let isValid = true;
    const invalidIngredients = [];

    for (let element of beverageIngredients) {
      const currentIngredient = await ingredientRepository.findOneBy({
        name: element,
      });
      if (currentIngredient === null) {
        isValid = false;
        invalidIngredients.push(element);
      } else {
        ingredientList.push(currentIngredient);
      }
    }

    if (!isValid) {
      return res
        .status(400)
        .json({ message: `${invalidIngredients} are not added as ingredient` });
    }
    const beverage = new Beverage();
    beverage.name = beverageName;
    beverage.ingredients = beverageIngredients;
    const beverageRepository = AppDataSource.getRepository(Beverage);
    await beverageRepository.save(beverage);
    console.log(beverage);
    return res.status(201).json(beverage);
  }
);
export default router;
