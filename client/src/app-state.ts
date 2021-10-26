import React from "react";
import { DepartmentModel } from "./models/department.model";
import { EmployeeModel } from "./models/employee.model";
import { EmployeeListingModel } from "./models/employeeListing.model";

export interface AppState {
  employees: EmployeeListingModel[];
  employeeDetails: EmployeeModel | null;
  departments: DepartmentModel[];
  titles: string[];
}

interface Context {
  appState: AppState;
  setAppState: (state: Partial<AppState>) => void;
}

export const StateContext = React.createContext<Context>({
  appState: {} as any,
  setAppState: (state: Partial<AppState>) => null,
});
