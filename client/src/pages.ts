import { AboutPage } from "./pages/AboutPage/AboutPage";
import { EmployeeListPage } from "./pages/EmployeeListPage/EmployeeListPage";

export const mainPages = [
  {
    title: "Employees",
    path: "/employees",
    component: EmployeeListPage,
  },
  {
    title: 'About',
    path: '/about',
    component: AboutPage
  }
];
