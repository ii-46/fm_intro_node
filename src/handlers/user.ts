import prisma from "../db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res, next) => {
    try {
        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                password: await hashPassword(req.body.password),
            },
        });

        const token = createJWT(user);
        res.json({ sucess: true, token });
    } catch (error) {
        error.type = "input";
        next(error);
    }
};

export const signin = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: { username: req.body.username },
    });
    const valid = await comparePassword(req.body.password, user.password);
    if (!valid) {
        return res
            .status(401)
            .json({ sucess: false, message: "Invalid Credentials" });
    }
    const token = createJWT(user);
    res.json({ sucess: true, token });
};
