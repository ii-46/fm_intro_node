import * as dotenv from "dotenv";
dotenv.config();
import app from "./server";
const port = 3000;

app.listen(port, () => console.log(`listening on port ${port}!`));
