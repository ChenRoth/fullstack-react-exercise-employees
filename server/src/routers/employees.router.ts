import { Router, Request, Response } from "express";
import {
  changeTitle,
  getEmployeeDetails,
  removeEmployee,
  searchByDepartment,
} from "../db/queries";
import { EmployeeModel } from "../models/employee.model";
import { EmployeeListingModel } from "../models/employeeListing.model";

export const employeeRouter = Router();

employeeRouter.get(
  "/:id",
  async (req: Request<{ id: string }>, res: Response<EmployeeModel>) => {
    const { id } = req.params;

    const idAsNumber = Number(id);
    if (isNaN(idAsNumber)) {
      return res.sendStatus(400);
    }

    const employee = await getEmployeeDetails(idAsNumber);

    res.send(employee);
  }
);

employeeRouter.delete(
  "/:id",
  async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    const idAsNumber = Number(id);
    if (isNaN(idAsNumber)) {
      return res.sendStatus(400);
    }

    await removeEmployee(idAsNumber);
    res.sendStatus(200);
  }
);

employeeRouter.get(
  "/search/department/:departmentId",
  async (
    req: Request<{ departmentId: string }>,
    res: Response<
      | { employees: EmployeeListingModel[]; manager: EmployeeListingModel }
      | string
    >
  ) => {
    const { departmentId } = req.params;
    const size = Number(req.query.size);
    const page = Number(req.query.page);

    if (isNaN(size) || isNaN(page)) {
      return res.status(400).send("query size and page must be numbers");
    }
    const { employees, manager } = await searchByDepartment(
      departmentId,
      page,
      size
    );
    res.send({ employees, manager });
  }
);

employeeRouter.put(
  "/:id/title",
  async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const { title } = req.body;
    const idAsNumber = Number(id);
    if (isNaN(idAsNumber)) {
      return res.sendStatus(400);
    }

    if (!title) {
      return res.sendStatus(400);
    }

    await changeTitle(idAsNumber, title);
    res.sendStatus(200);
  }
);
