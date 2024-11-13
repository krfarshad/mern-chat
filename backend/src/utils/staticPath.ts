import { Request } from "express";

export const staticPath = (
  req: Request,
  type: "avatar" | "cover" | "artistAvatar",
  fileName: string
) => {
  const baseUrl = req.protocol + "://" + req.get("host") + "/uploads/";

  let url = baseUrl;
  switch (type) {
    case "avatar":
      url += "avatar/" + fileName;
      break;

    case "cover":
      url += "covers/" + fileName;
      break;

    case "artistAvatar":
      url += "artists/" + fileName;
      break;
    default:
      throw new Error("File doesn't exist!");
  }
  return new URL(url);
};
