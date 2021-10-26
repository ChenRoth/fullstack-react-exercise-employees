import { RowDataPacket } from "mysql2";
import { DepartmentModel } from "../models/department.model";
import { EmployeeModel } from "../models/employee.model";
import { EmployeeListingModel } from "../models/employeeListing.model";
import { db } from "./db";

// this is the type we use for db.query
type DbQueryResult<TableRecord> = (TableRecord & RowDataPacket)[];

export async function getTitles(): Promise<string[]> {
  const [records] = await db.query<DbQueryResult<{title: string}>>(
    "SELECT distinct(title) FROM titles"
  );
  return records.map(record => record.title) as string[];
}

export async function changeTitle(employeeId: number, title: string): Promise<void> {
  await db.query(`UPDATE titles SET title = ? WHERE emp_no = ? AND to_date='9999-01-01'`, [title, employeeId]);
}

export async function getEmployeeDetails(
  employeeId: number
): Promise<EmployeeModel> {
  const [[employee]] = await db.query<DbQueryResult<EmployeeModel>>(
    `SELECT e.emp_no id, first_name firstName, last_name lastName, birth_date birthDate, hire_date hireDate, salary, title 
    FROM employees e INNER JOIN salaries s INNER JOIN titles t
    ON e.emp_no = s.emp_no AND e.emp_no = t.emp_no
    WHERE e.emp_no = ? AND t.to_date = '9999-01-01' AND s.to_date = '9999-01-01'`,
    [employeeId]
  );
  // we need to cast the result to be without RowDataPacket
  return employee as EmployeeModel;
}

export async function removeEmployee(employeeId: number): Promise<void> {
  // wait for all DB queries to finish and then return from the function
  await Promise.all([
    db.query("DELETE FROM employees WHERE emp_no = ?", [employeeId]),
    db.query("DELETE FROM dept_emp WHERE emp_no = ?", [employeeId]),
    db.query("DELETE FROM dept_manager WHERE emp_no = ?", [employeeId]),
    db.query("DELETE FROM salaries WHERE emp_no = ?", [employeeId]),
    db.query("DELETE FROM titles WHERE emp_no = ?", [employeeId]),
  ]);
}

export async function getDepartments(): Promise<DepartmentModel[]> {
  const [departments] = await db.query<DbQueryResult<DepartmentModel>>(
    "SELECT dept_no id, dept_name name FROM departments"
  );
  return departments as DepartmentModel[];
}

export async function searchByDepartment(
  departmentId: string,
  page: number,
  size: number
): Promise<{
  employees: EmployeeListingModel[];
  manager: EmployeeListingModel;
}> {
  const [employees] = await db.query<DbQueryResult<EmployeeListingModel>>(
    `SELECT employees.emp_no id, first_name firstName, last_name lastName 
    FROM dept_emp INNER JOIN employees 
    ON dept_emp.emp_no = employees.emp_no 
    WHERE dept_no = ? AND to_date = '9999-01-01'
    LIMIT ?, ?`,
    [departmentId, page * size, size]
  );

  const [[manager]] = await db.query<DbQueryResult<EmployeeListingModel>>(
    `SELECT employees.emp_no id, first_name firstName, last_name lastName 
    FROM dept_manager INNER JOIN employees 
    ON dept_manager.emp_no = employees.emp_no 
    WHERE dept_no = ? AND to_date = '9999-01-01'`,
    [departmentId, page * size, size]
  );
  return {
    employees: employees as EmployeeListingModel[],
    manager: manager as EmployeeListingModel,
  };
}
