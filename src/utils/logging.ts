import express = require("express");

export const Logging = (
  req: express.Request,
  res: express.Response,
  next: any
) => {
  console.log(req.method, req.originalUrl);
  next();
};
