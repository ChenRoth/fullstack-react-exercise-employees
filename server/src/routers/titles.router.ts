import { Request, Response, Router } from "express";
import { getTitles } from "../db/queries";

export const titleRouter = Router();

titleRouter.get(
  "/",
  async (req: Request, res: Response<string[]>) => {
    const titles = await getTitles();
    res.send(titles);
  }
);
