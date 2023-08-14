import { Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import { stat } from "fs";
import {
    createProduct,
    deleteProduct,
    getProduct,
    getProducts,
    updateProduct,
} from "./handlers/product";
import { create } from "domain";
import { createUpdate } from "./handlers/update";
const router = Router();

router.get("/product", getProducts);
router.get("/product/:id", getProduct);
router.put(
    "/product/:id",
    body("name").isString(),
    handleInputErrors,
    (req, res) => {
        res.json({ message: "hello world" });
    }
);
router.post(
    "/product/",
    body("name").isString(),
    handleInputErrors,
    createProduct
);
router.delete("/product/:id", deleteProduct);

router.get("/update", (req, res) => {});
router.get("/update/:id", (req, res) => {});
router.put(
    "/update/:id",
    body("title").optional(),
    body("body").optional(),
    oneOf(
        [
            body("status").equals("IN_PROGRESSED").optional(),
            body("status").equals("LIVE").optional(),
            body("status").equals("DEPRECATED").optional(),
            body("status").equals("ACHIEVED").optional(),
        ],
        {
            message:
                "status must be IN_PROGRESSED, LIVE, DEPRECATED, or ACHIEVED",
        }
    ),
    body("version").optional(),
    updateProduct
);
router.post(
    "/update/",
    body("title").isString(),
    body("body").isString(),
    oneOf(
        [
            body("status").equals("IN_PROGRESSED"),
            body("status").equals("LIVE"),
            body("status").equals("DEPRECATED"),
            body("status").equals("ACHIEVED"),
        ],
        {
            message:
                "status must be IN_PROGRESSED, LIVE, DEPRECATED, or ACHIEVED",
        }
    ),
    body("version").isString(),
    body("productId").isString(),
    handleInputErrors,
    createUpdate
);
router.delete("/update/:id", (req, res) => {});

router.get("/updatepoint", (req, res) => {});
router.get("/updatepoint/:id", (req, res) => {});
router.put(
    "/updatepoint/:id",
    body("name").optional().isString(),
    body("description").optional().isString(),
    handleInputErrors,
    (req, res) => {}
);
router.post(
    "/updatepoint/",
    body("name").isString(),
    body("description").isString(),
    body("update_id").isString(),
    handleInputErrors,
    (req, res) => {}
);
router.delete("/updatepoint/:id", (req, res) => {});

router.use((err, req, res, next) => {
    if (err.type === "auth") {
        return res.status(401).json({ type: "auth", message: err.message });
    }
    if (err.type === "input") {
        return res.status(400).json({ type: "input", message: err.message });
    } else {
        return res.status(500).json({ message: err.message });
    }
});

export default router;
