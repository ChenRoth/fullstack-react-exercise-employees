import { Router, Request, Response } from "express";
import { getEmployees } from "../db/queries";
import { EmployeeModel } from "../models/employee.model";

export const employeeRouter = Router();

employeeRouter.get(
  "/",
  async (req: Request, res: Response<EmployeeModel[]>) => {
    const employees = await getEmployees();
    res.send(employees);
  }
);

employeeRouter.get(
  "/:id",
  async (req: Request<{ id: string }>, res: Response<EmployeeModel>) => {
    const { id } = req.params;

    const idAsNumber = Number(id);
    if (isNaN(idAsNumber)) {
      return res.sendStatus(400);
    }

    res.send({ id: idAsNumber, firstName: "mock" });
  }
);
