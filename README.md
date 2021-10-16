# SoftTech (React/NodeJS/MySQL Exercise)

## Product Spec

We, at SoftTech, are very proud of our products!
That's why we've decide to write our own HR management app

Our HR database includes the company's employees, the departments and management hierarchy, and most importantly - salaries!

1) Write a web app using React, MySQL and Node Express which would allow our HR department to list employees in the following ways:
  * List all employees with a specific job title (using a drop-down list populated dynamically from the datbase)
  * List all employees in a specific department, and the department's manager (using a drop-down list populated dynamically from the database)
  * List the highest top X paid employees (where X is provided by the user's input)
  * Search employees across the entire company by their first name, last name and gender - 3 combined filters. The name inputs can be part of the full names.

2) All of the lists will show the first and last names of the relevant employees in table rows,
where each row would also be a link to a fully detailed record page of the employee -
employee #, birth date, first name, last name, gender, hire date, title, department and salary.
An employee's details page should also have deep link (URL) which is accessible directly by specifying the employee number, e.g. /employees/345

3) in the details page, there will also be the following available actions:

* change the salary of the employee (using a user's input)
* change the title of the employee (using a drop-down list populated dynamically with already existing titles in the database)
* fire the employee :( 

4) Add an "About" page to the app with a short description of the company. You could also throw in a few photos from the company's last Christmas party
   
 
## Design

* You're free to use any UI library and design as long as it's sensible and user-friendly.

* The recommended design is a top navbar which allows you to navigate between the pages ("home page", employee search" and "about"). 
On the employee search page, you could use tabs for each kind of search

## Technical Considerations
  
* The database is big (check out how many employees there are in the company..),
  which means you'd have to be frugal with your data:
  
1) execute efficient queries (use optimal SELECT and WHERE clauses)
1) send only the required data over the wire (smaller HTTP responses)
1) render data without overloading the browser (*ahem* pagination *ahem*)

DO NOT optimize prematurely!
Start by making the app functional, such as by hard-limiting your queries to avoid oversized result sets (e.g. max 20 results) and later on optimizing your queries and adding pagination.

* Make sure your DB and client app state are as synchronized as possible to avoid bugs. 
Whenever the user causes a change in the DB (e.g. change a salary), make sure it's also reflected in the client app state if needed.


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
