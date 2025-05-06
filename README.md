#Employee-Tracker

 ## Table of Content
  * [Description](#decription)
  * [Usage](#usage)
  * [User Story](#userStory)
  * [Acceptance Criteria](#acceptanceCriteria)

  
  ## Description 
This challenge allows the user to interact with and manage a comprehensive employee database. Users can view lists of employees, roles, and departments, as well as add new entries for each. Additionally, the application supports updating employee information, including role assignments, ensuring the database remains current and organized.

  ## Usage
 [Watch demo here](https://app.screencastify.com/v3/watch/uV8kyvX7ADsJiE7mO5IP)


## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```


