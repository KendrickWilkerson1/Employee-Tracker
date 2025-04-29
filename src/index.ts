import dotenv from "dotenv";
import { pool } from "./connection.js";
import inquirer from "inquirer";
dotenv.config();


const getAllDepartments = async () => {
  const result = await pool.query("SELECT * FROM department");
  console.table(result.rows);
  cliStart();
};

const addDepartment = async () => {
  inquirer.prompt([
    {
      type: "input",
      name: "departmentName",
      message: "What is the name of the department you'd like to add?",
    },
  ])
  .then( async (answers) => {
    await pool.query(`INSERT INTO department (name) VALUES ('${answers.departmentName}')`);
    console.log(`Added ${answers.departmentName} to the database`);
    cliStart();
  });
  
};

const getAllRoles = async () => {
  const result = await pool.query("SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id");
  console.table(result.rows);
  cliStart();
};

const addRole = async () => {
    try {
        const departmentResults = await pool.query('SELECT id, name FROM department');
        
        
        const departmentChoices = departmentResults.rows.map(department => ({
            name: department.name,
            value: department.id
        
        }));
        
        inquirer.prompt([
        {
            type: "input",
            name: "roleName",
            message: "What is the name of the role?"
        },
        {
            type: "input",
            name: "salaryAmount",
            message: "What is the salary of the role?"
        },
        {
            type: "list",
            name: "department_id",
            message: "Which department does this role belong to?",
            choices: departmentChoices
        }
        ])
        .then ( async (answers) => {
        await pool.query(`INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)`, [answers.roleName, answers.salaryAmount, answers.department_id]);
        console.log(`Added ${answers.roleName} to the database`);
        cliStart();
        })
        } catch (error) {
        console.error('Error adding role', error)
    }
};


const getAllEmployees = async () => {
  const result = await pool.query("SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, manager.first_name || ' ' || manager.last_name AS manager FROM employee JOIN role ON employee.role_id = role.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id");
  console.table(result.rows);
  cliStart();
};


const addEmployee = async () => {
    try {
        const roleResults = await pool.query('SELECT id, title FROM role');
        
        
        const roleChoices = roleResults.rows.map(role => ({
            name: role.title,
            value: role.id
        }));

        const managerResults = await pool.query('SELECT id, first_name, last_name FROM employee WHERE manager_id IS NULL');

        const managerChoices = managerResults.rows.map(manager => ({
            name: `${manager.first_name} ${manager.last_name}`,
            value: manager.id
        }));

        managerChoices.unshift({
          name: 'None',
          value: null
        });

        console.log(managerChoices);
        
        inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?"
        },
        {
            type: "list",
            name: "role_id",
            message: "What is the employee's role?",
            choices: roleChoices
        },
        {
            type: "list",
            name: "manager_id",
            message: "Who is the employee's manager?",
            choices: managerChoices
        }
        ])
        .then ( async (answers) => {
        await pool.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`, [answers.firstName, answers.lastName, answers.role_id, answers.manager_id]);
        console.log(`Added ${answers.firstName} ${answers.lastName} to the database`);
        cliStart();
        })
        } catch (error) {
        console.error('Error adding role', error)
    }
};

const updateEmployeeRole = async () => {
  try {
    const roleResults = await pool.query('SELECT id, title FROM role');
        
        
    const roleChoices = roleResults.rows.map(role => ({
        name: role.title,
        value: role.id
    }));

    const employeeResults = await pool.query('SELECT id, first_name, last_name FROM employee');
    const employeeChoices = employeeResults.rows.map(employee => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id
    }));

    const managerResults = await pool.query('SELECT id, first_name, last_name FROM employee WHERE manager_id IS NULL');

    const managerChoices = managerResults.rows.map(manager => ({
        name: `${manager.first_name} ${manager.last_name}`,
        value: manager.id
    }));

    managerChoices.unshift({
      name: 'None',
      value: null
    });

    
    inquirer.prompt([
      {type:'list',
        name: 'employeeId',
        message:"Which employee's role do you want to update?",
        choices: employeeChoices 
      },
      {
        type: 'list',
        name: 'newRoleId',
        message: 'Which role do you want to assign the selected employee?',
        choices: roleChoices
      },
      {        
        type: "list",
        name: "managerId",
        message: "Who is the employee's manager?",
        choices: managerChoices
      }
    ])
    .then (async (answers) => {
      console.log('These are answers', answers);
      try {
      await pool.query(`UPDATE employee SET role_id = $1, manager_id = $2 WHERE id = $3`, [answers.newRoleId, answers.managerId, answers.employeeId]);
      console.log("Updated employee's role")
      } catch (err){
        console.log('error ===', err)
      }
      cliStart();  
    })
  } catch (error) {
    console.error("Error updating employee's role", error)
  }
};

const cliStart = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "startingChoices",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
      },
    ])
    .then((answers) => {
      if (answers.startingChoices === "View All Employees") {
        getAllEmployees();
      }
      if (answers.startingChoices === "View All Departments") {
        getAllDepartments();
      }
      if (answers.startingChoices === "View All Roles") {
        getAllRoles();
      }
      if (answers.startingChoices === "Add Department") {
        addDepartment();
      }
      if (answers.startingChoices === "Add Role") {
        addRole();
      }
      if(answers.startingChoices === "Add Employee") {
        addEmployee();
      }
      if (answers.startingChoices === "Update Employee Role") {
        updateEmployeeRole();
      }
    });
};
cliStart();
