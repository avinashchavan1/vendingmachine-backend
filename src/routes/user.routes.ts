import express = require("express");
const router = express.Router();
router.get(
  "/test",
  (req: express.Request, res: express.Response, next: any) => {
    res.json({ Message: "From User" }).status(200);
  }
);

export default router;
