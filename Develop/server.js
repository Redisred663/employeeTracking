const { printTable } = require('console-table-printer');
const mysql = require('mysql2');
const inquirer = require('inquirer');

// connecting to db
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "password",
        database: 'employee_db',
    },
    console.log(`Connected successfully to your employees_db!`)
);
db.connect(() => {
    inquireFunction();
})

function inquireFunction() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "MainMenu",
                message: "Welcome! What option shall you choose today?",
                choices: [
                    "View all Departments",
                    "View all Roles",
                    "View all Employees",
                    "Add a new Department",
                    "Add a new Role",
                    "Add a new Employee",
                    "Update information for a current Employee",
                ],
            },
        ])
        .then(({ MainMenu }) => {
            switch (MainMenu) {
                case "View all Departments":
                    viewDepartments();
                    return;

                case "View all Roles":
                    viewRoles();
                    return;

                case "View all Employees":
                    viewEmployees();
                    return;

                case "Add a new Department":
                    addDepartment();
                    return;

                case "Add a new Role":
                    addRole();
                    return;

                case "Add a new Employee":
                    addEmployee();
                    return;

                case "Update information for a current Employee":
                    updateRole();
                    return;
            }
        });
}

function viewDepartments() {
    db.query("select * from department", function (err, res) {
      if (err) throw err;
      printTable(res);
      inquireFunction();
    });
  }
  
  function viewRoles() {
    db.query("select * from roles", function (err, res) {
      if (err) throw err;
      printTable(res);
      inquireFunction();
    });
  }
  
  function viewEmployees() {
    db.query("select * from employees", function (err, res) {
      if (err) throw err;
      printTable(res);
      inquireFunction();
    });
  }

function addDepartment() {
    inquirer
    .prompt([
    {
        type: "input",
        message: "Please type in the name of the new Department",
        name: "dep_name",
    },
    ])
    .then(({ dep_name}) => {
        db.query(
            "INSERT INTO department (dep_name) VALUES (?)",
            [dep_name],
            function (err) {
                if (err) throw err;
                console.log("Department successfully added!");
                inquireFunction();
            }
        );
    });
}

function addRole() {
    inquirer
    .prompt([
        {
            type: "input",
            message: "Which Department will this role be assigned to?",
            name: "department_id",
        },
        {
            type: "input",
            message: "What will be the title of this role?",
            name: "title",
        },
        {
            type: "input",
            message: "What will the salary of this role be?",
            name: "salary",
        },
    ])
    .then(({ department_id, title, salary}) => {
        db.query(
            "INSERT INTO roles (department_id, title, salary) VALUES (?,?,?)",
        [department_id, title, salary],
        function (err) {
          if (err) throw err;
          console.log("New Role successfully added!");
          inquireFunction();
        } 
        )
    })
}

function addEmployee() {
    inquirer
    .prompt([
        {
            type: "input",
            message: "What is the first name of the new Employee?",
            name: "first_name",
          },
          {
            type: "input",
            message: "What is the last name of this new Employee?",
            name: "last_name",
          },
          {
            type: "input",
            message: "What will be the role of this new Employee?",
            name: "role_id",
          },
    ])
    .then(({ first_name, last_name, role_id}) => {
        db.query(
            "INSERT INTO employees (first_name, last_name, role_id) VALUES (?,?,?)",
            [first_name, last_name, role_id],
            function (err) {
              if (err) throw err;
              console.log("New Employee successfully added!");
              inquireFunction();
            }
          );
    });
}

function updateRole() {
    db.query("select * from employees", function (err, res) {
        let employees = res;
        const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id,
        }));
        console.log(employeeChoices);
        inquirer
          .prompt([
            {
              type: "list",
              name: "employeesID",
              message: "Select an employee by ID to update their role.",
    
              choices: employeeChoices,
            },
          ])
          .then((res) => {
            let employeeID = res.employeeID;
    
            db.query("select * from roles", function (err, res) {
              let role = res;
              const roleChoices = role.map(({ id, title }) => ({
                name: `${title}`,
                value: id,
              }));
    
              console.log(roleChoices);
    
              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "roleID",
                    message: "Select an role by ID to update their role: ",
                    choices: roleChoices,
                  },
                ])
    
                .then((res) => {
                  db.query(
                    "update employees set role_id =? where id =?",
                    [res.roleID, employeeID],
                    function (err) {
                      if (err) throw err;
                      console.log("Employee role successfully updated!");
                      inquireFunction();
                    }
                  );
                });
            });
          });
      });
    }
