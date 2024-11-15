import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";

import { User } from "../models/user-model";
import { ApiSuccess } from "../utils/ApiSuccess";
import { ApiError } from "../utils/ApiError";

class UserHandler {
  public list = asyncHandler(async (req: Request, res: Response) => {
    let { search } = req.query;
    const filterSearch = search as string;
    if (!filterSearch) {
      return res.json(new ApiError(401, "Enter username for search"));
    }
    try {
      const users = await User.find({
        username: { $regex: filterSearch.trim(), $options: "i" },
      })
        .select("id username avatar")
        .limit(20)
        .sort({ username: 1 })
        .lean();

      res.json(new ApiSuccess(200, users, "Successful"));
    } catch (error) {
      res.status(500).json({ message: "Error fetching users" });
    }
  });
}

export const UserController = new UserHandler();
