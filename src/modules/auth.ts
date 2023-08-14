import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createJWT = (user) => {
    const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET
    );
    return token;
};

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer || !bearer.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ sucess: false, message: "No Authorization Token" });
    }
    const [, token] = bearer.split(" ");
    if (!token) {
        return res
            .status(401)
            .json({ sucess: false, message: "No Authorization Token" });
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        console.log(error);

        return res
            .status(401)
            .json({ sucess: false, message: "Invalid Authorization Token" });
    }
};

export const comparePassword = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};

export const hashPassword = (password) => {
    return bcrypt.hash(password, 5);
};
