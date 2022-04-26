import express = require("express");
import { AppDataSource } from "../data-source";
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
export default router;
