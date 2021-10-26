import { EmployeeModel } from "./employee.model";

export type EmployeeListingModel = Pick<EmployeeModel, 'id' | 'firstName' | 'lastName'>;