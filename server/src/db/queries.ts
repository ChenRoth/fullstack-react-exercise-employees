import { RowDataPacket } from "mysql2";
import { EmployeeModel } from "../models/employee.model";
import { db } from "./db";

// this is the type we use for db.query
type DbQueryResult<TableRecord> = (TableRecord & RowDataPacket)[];

export async function getEmployees(): Promise<EmployeeModel[]> {
  const [employees] = await db.query<DbQueryResult<EmployeeModel>>("SELECT emp_no id, first_name firstName FROM Employees LIMIT 10");
  // we need to cast the result to be without RowDataPacket
  return employees as EmployeeModel[];
}
