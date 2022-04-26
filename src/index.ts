import { AppDataSource } from "./data-source";
import express = require("express");
import AdminRoutes from "./routes/admin.routes";
import UserRoutes from "./routes/user.routes";
import { Logging } from "./utils/logging";
const app = express();
app.use(express.json());

app.use(Logging);

app.use("/admin", AdminRoutes);
app.use("/user", UserRoutes);

AppDataSource.initialize()
  .then(async () => {
    console.log("Connected");
    app.listen(3000);
  })
  .catch((error) => console.log(error));
