import { matchedData, validationResult } from "express-validator";
import { mockData } from "../mockData";
import { hashPassword } from "../passwordUtils";
import { User } from "@/models/user-model";
import { Request, Response } from "express";

export const getUserByIdHandler = (req: Request, res: Response) => {
  // @ts-ignore
  const { findUserIndex } = req;
  const findUser = mockData[findUserIndex];
  if (!findUser) {
    res.status(404);
    throw new Error("User not found!");
  }
  return res.send(findUser);
};

export const createUserHandler = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400);
    throw new Error(`${result.array}`);
  }
  const data = matchedData(req);
  data.password = hashPassword(data.password);
  const newUser = new User(data);
  try {
    const savedUser = await newUser.save();
    res.status(201).send(savedUser);
  } catch (err) {
    res.status(400);
    throw new Error(`${err}`);
  }
};
