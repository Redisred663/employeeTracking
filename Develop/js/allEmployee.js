const inquireFunct = require('inquirer');

// TODO: Create an inquire for the console and export to server.js
function inquireFunct() {
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
    .then(({MainMenu}) => {
        
    })
}

module.exports = inquireFunct;