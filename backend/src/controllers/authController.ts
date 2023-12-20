import express from "express";
import asyncHandler from "express-async-handler";
import User from "../models/User";
import generateToken from "../utils/genarateToken";
import bcrypt from "bcryptjs";

const authUser = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("Invalid Email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (user && isPasswordValid) {
      res.json({
        _id: user._id,
        name: user.fullName,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or password");
    }
  }
);

const registerUser = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const { fullName, email, password } = req.body;

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({ fullName, email, password });

    if (user) {
      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User data");
    }
  }
);

//@desc Get user profile
//@route GET/api/users/profile
//@access Private
const getUserProfile = asyncHandler(
  async (req: Request | any, res: Response | any) => {
    const user = await User.findById(req.user!._id);

    if (user) {
      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  }
);

export { authUser, registerUser, getUserProfile };
