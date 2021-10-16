import { AboutPage } from "./pages/AboutPage/AboutPage";
import { EmployeeListPage } from "./pages/EmployeeListPage/EmployeeListPage";
import { HomePage } from "./pages/HomePage/HomePage";

export const mainPages = [
  {
    title: "Home",
    path: "/",
    component: HomePage,
  },
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
