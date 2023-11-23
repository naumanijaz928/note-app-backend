import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";
const PORT: number | string = env.PORT || 4000;

mongoose
  .connect(env.DB_URL)
  .then(() => {
    console.log("DB connected Successful");
    app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}`));
  })
  .catch((Err) => console.log(Err));
