export interface EmployeeModel {
    id: number;
    firstName: string;
    lastName: string;
    birthDate: Date;
    hireDate: Date;
    gender: 'M' | 'F';
    salary: number;
    title: string;
}