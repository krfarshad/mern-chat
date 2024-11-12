import { Request } from "express";

export const staticPath = (
  req: Request,
  type: "music" | "cover" | "artistAvatar",
  fileName: string
) => {
  const baseUrl = req.protocol + "://" + req.get("host") + "/uploads/";

  let url = baseUrl;
  switch (type) {
    case "music":
      url += "musics/" + fileName;
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
