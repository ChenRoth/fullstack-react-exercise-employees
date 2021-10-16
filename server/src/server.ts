import express from "express";
import cors from "cors";
import expressJwt from "express-jwt";
import { employeeRouter } from "./routers/employees.router";
const PORT = 4000;

const { JWT_SECRET = "secret" } = process.env;

const app = express();

app.use(cors());
app.use(express.json());
// comment out this line if you want to bypass JWT check during development
// app.use(expressJwt({secret: JWT_SECRET}).unless({path: '/'}));

app.use("/api/employees", employeeRouter);

app.listen(PORT, () => console.log(`Server is up at ${PORT}`));
