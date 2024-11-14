import { matchedData } from "express-validator";
import { comparePassword, hashPassword } from "../utils/passwordUtils";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { config } from "../config/global.config";
import { ApiSuccess } from "../utils/ApiSuccess";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/user-model";
import { staticPath } from "../utils/staticPath";
class AuthHandler {
  private tokenCreation = async (req: Request, res: Response, user: any) => {
    const accessToken = jwt.sign({ id: user.id }, config.jwt_secret, {
      expiresIn: "8h",
    });
    const refreshToken = jwt.sign(
      { id: user.id },
      config.refresh_token_secret,
      { expiresIn: "4d" }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return accessToken;
  };
  // @desc Register user
  // @route POST /api/v1/auth/user
  // @access public
  public register = asyncHandler(async (req: Request, res: Response) => {
    const data = matchedData(req);
    const { username, email } = data;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      res
        .status(400)
        .json(new ApiError(400, "Username or Email already exists"));
    }

    data.password = hashPassword(data.password);
    const newUser = new User(data);
    const savedUser = await newUser.save();

    const accessToken = await this.tokenCreation(req, res, newUser);

    let userRegister = {
      username: savedUser.username,
      accessToken: accessToken,
      displayName: savedUser.displayName,
      email: savedUser.email,
    };

    res
      .status(201)
      .json(new ApiSuccess(201, userRegister, "Registered successfully"));
  });

  // @desc Logout user
  // @route POST /api/v1/auth/logout
  // @access public
  public logout = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      res.status(401).json(new ApiError(401, "Invalid data"));
    }

    req.logout((err) => {
      if (err) res.status(400).json(new ApiError(400, "Logout failed"));

      res.status(200).json(new ApiSuccess(200, null, "Logout successful"));
    });
  });

  // @desc Login status user
  // @route GET /api/v1/auth/status
  // @access public
  public status = asyncHandler(async (req: Request, res: Response) => {
    const user: any = req.user;
    if (!user) {
      res.status(401).json(new ApiError(401, "Not logged in"));
    }
    res
      .status(200)
      .json(
        new ApiSuccess(200, { username: user.username }, "User is logged in")
      );
  });

  // @desc login user
  // @route POST /api/v1/auth/login
  // @access public
  public login = asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user: any = await User.findOne({ username });
    console.log("user", user);
    if (!user) {
      res.status(401).json(new ApiError(401, "Incorrect username or password"));
    }

    // TODO: UNCOMMENT THIS COMPARE
    // const isMatch = await comparePassword(password, user.password);
    // const isMatch = await comparePassword(password, user.password);

    console.log("isMatch", password);

    if (password != user.password) {
      res.status(401).json(new ApiError(401, "Incorrect username or password"));
    } else {
      const accessToken = await this.tokenCreation(req, res, user);
      console.log("accessToken", accessToken);

      res
        .status(200)
        .json(
          new ApiSuccess(
            200,
            { username: user.username, avatar: user.avatar, accessToken },
            "Login successful"
          )
        );
    }
  });

  // @desc refresh token
  // @route POST /api/v1/auth/refresh-token
  // @access public
  public refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    const { csrfToken } = req.body;

    if (!csrfToken || !csrfToken.verify(config.csrf_secret, csrfToken)) {
      res.status(403).json(new ApiError(403, "Invalid CSRF token"));
    }

    if (!refreshToken) {
      res.status(401).json(new ApiError(401, "No refresh token provided"));
    }

    jwt.verify(
      refreshToken,
      config.refresh_token_secret,
      (err: any, user: any) => {
        if (err)
          res.status(403).json(new ApiError(403, "Invalid refresh token"));

        const newAccessToken = jwt.sign({ id: user.id }, config.jwt_secret, {
          expiresIn: "15m",
        });
        res
          .status(200)
          .json(
            new ApiSuccess(
              200,
              { accessToken: newAccessToken },
              "Token refreshed successfully"
            )
          );
      }
    );
  });

  public completeProfile = asyncHandler(async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Token is required" });
    } else {
      try {
        // Decode and verify the JWT token
        const decoded: any = jwt.verify(token, config.jwt_secret);
        const { id } = decoded;

        let user = await User.findById(id);
        if (!user) {
          res.status(404).json({ message: "User not found" });
        } else {
          const { displayName, bio } = req.body;
          if (displayName) user.displayName = displayName;
          if (bio) user.bio = bio;
          if (req?.file?.filename) user.avatar = req.file.filename;
          const updatedUser = await user.save();

          const userResponse = {
            username: updatedUser.username,
            displayName: updatedUser.displayName,
            email: updatedUser.email,
            bio: updatedUser.bio,
            avatar: updatedUser.avatar
              ? staticPath(req, "avatar", updatedUser.avatar)
              : "",
          };

          res
            .status(202)
            .json(
              new ApiSuccess(202, userResponse, "Profile updated successfully")
            );
        }
      } catch (error: any) {
        if (
          error.name === "JsonWebTokenError" ||
          error.name === "TokenExpiredError"
        ) {
          res.status(401).json({ message: "Invalid or expired token" });
        }
        res.status(500).json({ message: error });
      }
    }
  });
}

export const AuthController = new AuthHandler();
