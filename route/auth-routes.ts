import express, { Request, Response, NextFunction } from "express";
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from "bcrypt";
import User from "../model/User";




dotenv.config();
const router = express.Router();

interface IUserCredentials {
    email: string;
    password: string;
}

async function createUser(user: IUserCredentials ) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = new User({ email: user.email, password: hashedPassword});
    await newUser.save();
    console.log("User created:", newUser);
}

async function verifyUserCredentials(verifyUser: IUserCredentials): Promise<boolean> {
    const user = await User.findOne({ email: verifyUser.email });
    if (!user) {
        return false;
    }
    return await bcrypt.compare(verifyUser.password, user.password);
}

router.post("/login", async (req: Request, res: Response) => {
    console.log('Login');
    const { email, password } = req.body.user;
    try {
        const isVerified = await verifyUserCredentials({ email, password });
        if (isVerified) {
            const token = jwt.sign({ email }, process.env.SECRET_KEY as Secret, { expiresIn: "1m" });
            const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN as Secret, { expiresIn: "7d" });
            res.json({ accessToken: token, refreshToken: refreshToken });
        } else {
            res.status(403).send('Invalid credentials');
        }
    } catch (err) {
        console.log(err);
        res.status(400).send("An error occurred");
    }
});

router.post("/register", async (req: Request, res: Response) => {
    console.log('Register', req.body);
    const { email, password } = req.body.user;
    try {
        await createUser({ email, password });
        res.status(201).send('User registered');
    } catch (err) {
        console.log(err);
        res.status(401).json(err);
    }
});

// @ts-ignore
router.post("/refresh-token", async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    const refresh_token = authHeader?.split(' ')[1];
    if (!refresh_token) return res.status(401).send('No token provided');
    try {
        const payload = jwt.verify(refresh_token, process.env.REFRESH_TOKEN as Secret) as { email: string, iat: number };
        const token = jwt.sign({ email: payload.email }, process.env.SECRET_KEY as Secret, { expiresIn: "1m" });
        res.json({ accessToken: token });
    } catch (err) {
        console.log(err);
        res.status(401).json(err);
    }
});

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    if (!token) return res.status(401).send('No token provided');
    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY as Secret) as { email: string, iat: number };
        req.body.username = payload.email;
        next();
    } catch (err) {
        res.status(401).send(err);
    }
}

export default router;