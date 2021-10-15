import React from 'react';
import { EmployeeModel } from './models/employee.model';

export interface AppState {
    message: string;
    employees: EmployeeModel[]
}

interface Context {
    appState: AppState;
    setAppState: (state: Partial<AppState>) => void
}

export const StateContext = React.createContext<Context>({ appState: {} as any, setAppState: (state: Partial<AppState>) => null });