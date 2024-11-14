import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";

import { User } from "../models/user-model";
import { ApiSuccess } from "../utils/ApiSuccess";

class UserHandler {
  public list = asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, limit = 20, search } = req.query;

    try {
      let filter = {};
      if (search) {
        filter = { username: { $regex: search, $options: "i" } };
      }

      const pageNumber = parseInt(page as string, 10);
      const limitNumber = parseInt(limit as string, 10);
      const skip = (pageNumber - 1) * limitNumber;

      const users = await User.find(filter)
        .skip(skip)
        .limit(limitNumber)
        .sort({ username: 1 });

      const total = await User.countDocuments(filter);

      const totalPages = Math.ceil(total / limitNumber);

      res.json(
        new ApiSuccess(200, users, "Successful", {
          total,
          page: Number(page),
          totalPages: totalPages,
        })
      );
    } catch (error) {
      res.status(500).json({ message: "Error fetching users" });
    }
  });
}

export const UserController = new UserHandler();
