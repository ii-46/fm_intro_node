import router from "./router";
import express from "express";
import morgan from "morgan";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    req.shhh_secret = "shhh";
    next();
});

app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello, world!" });
});

app.use("/api", protect, router);

app.post("/user", createNewUser);
app.post("/signin", signin);

app.use((err, req, res, next) => {
    if (err.type === "auth") {
        return res.status(401).json({ type: "auth", message: err.message });
    }
    if (err.type === "input") {
        return res.status(400).json({ type: "input", message: err.message });
    } else {
        return res.status(500).json({ message: err.message });
    }
});
export default app;
