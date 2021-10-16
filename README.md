# Instructions

## setting up the database

* get the Employee database by downloading the https://github.com/datacharmer/test_db repository (https://github.com/datacharmer/test_db/archive/refs/heads/master.zip)

* unzip the file to an easily accessible location, e.g. C:\temp\test_db

* create a new schema `employees` in your MySQL server using MySQL Workbench

* open CMD/terminal, go to the location where you unzipped the test_db-master directory and type `mysql -u root -p employee_db < employees.sql`
  you'll then be prompted for your MySQL password

  if 'mysql' is not recognized, add it to your PATH by opening "Run..." and typing `rundll32.exe sysdm.cpl,EditEnvironmentVariables`
  then, double-click Path and add a new entry `C:\Program Files\MySQL\MySQL Server 8.0\bin` (if your MySQL is installed elsewhere, you can browse for it)

* once the last step is complete, your employee_db database should have 6 tables full of data

## setting up the code

* open a terminal at /client and run `npm i`, then `npm start` - your React dev server should be available at localhost:3000
* open a terminal at /server and run `npm i`, then `npm start` - your express server should be available at localhost:4000
