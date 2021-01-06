const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employeeRoster = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const askManager = [{
    type: 'confirm',
    message: 'Are you the manager of the company?',
    name: 'isManager'
}];

const managerInfo = [
    {
        type: 'input',
        message: 'What is your name?',
        name: 'managerName'
    },
    {
        type: 'input',
        message: 'What is your id?',
        name: 'managerID'
    },
    {
        type: 'input',
        message: 'What is your email?',
        name: 'managerEmail'
    },
    {
        type: 'input',
        message: 'What is your office number?',
        name: 'officeNumber'
    }
];

const userManagerInfo = [
    {
        type: 'input',
        message: "What is your manager's name?",
        name: 'managerName'
    },
    {
        type: 'input',
        message: "What is your manager's employee ID?",
        name: 'managerID'
    },
    {
        type: 'input',
        message: "What is your manager's email?",
        name: 'managerEmail'
    },
    {
        type: 'input',
        message: "What is your manager's office number?",
        name: 'officeNumber'
    }
];

const addEmployee = [
    {
        type: 'list',
        message: 'What type of employee would you like to add to the roster?',
        choices: [
            'Engineer',
            'Intern',
            'None'
        ],
        name: "role"
    }
];

const questionsEng = [
    {
        type: 'input',
        message: "What is the engineer's name?",
        name: 'engName'
    },
    {
        type: 'input',
        message: "What is the engineer's employee ID?",
        name: 'engID'
    },
    {
        type: 'input',
        message: "What is the engineer's email address?",
        name: 'engEmail'
    },
    {
        type: 'input',
        message: "What is the engineer's GitHub username?",
        name: 'engGitHub'
    }
];

const questionsInt = [
    {
        type: 'input',
        message: "What is the intern's name?",
        name: 'intName'
    },
    {
        type: 'input',
        message: "What is the intern's employee ID?",
        name: 'intID'
    },
    {
        type: 'input',
        message: "What is the intern's email address?",
        name: 'intEmail'
    },
    {
        type: 'input',
        message: "What school is the intern from?",
        name: 'intSchool'
    }
];

inquirer.prompt(askManager).then(res => {
    if (res.isManager === true){
        askManagerQuestions();
    }
    else{
        askUserManagerQuestions();
    }
});

const askManagerQuestions = () => {
    inquirer.prompt(managerInfo).then(res => {
        employeeRoster.push(new Manager(res.managerName, res.managerID, res.managerEmail, res.officeNumber));
        addEmployeeQuestions();
    });
};

const askUserManagerQuestions = () => {
    inquirer.prompt(userManagerInfo).then(res => {
        employeeRoster.push(new Manager(res.managerName, res.managerID, res.managerEmail, res.officeNumber));
        addEmployeeQuestions();
    });
};

const addEmployeeQuestions = () => {
    inquirer.prompt(addEmployee).then(res => {
        switch(res.role){
            case "Engineer":
                askQuestionsEng();
                break;
            case "Intern":
                askQuestionsInt();
                break;
            default:
                generateHTML();
        }
    });
};

const askQuestionsEng = () => {
    inquirer.prompt(questionsEng).then(res => {
        employeeRoster.push(new Engineer(res.engName, res.engID, res.engEmail, res.engGitHub));
        addEmployeeQuestions();
    });
};

const askQuestionsInt = () => {
    inquirer.prompt(questionsInt).then(res => {
        employeeRoster.push(new Intern(res.intName, res.intID, res.intEmail, res.intSchool));
        addEmployeeQuestions();
    });
};

const generateHTML = async () => {
    const HTML = render(employeeRoster);
    try {
        fs.writeFileSync(outputPath, HTML);
    } catch(err){
        console.log(err);
    }
};