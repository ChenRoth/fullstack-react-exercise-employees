import { Request, Response, Router } from "express";
import { getDepartments } from "../db/queries";
import { DepartmentModel } from "../models/department.model";

export const departmentRouter = Router();

departmentRouter.get(
  "/",
  async (req: Request, res: Response<DepartmentModel[]>) => {
    const departments = await getDepartments();
    res.send(departments);
  }
);
