#!/usr/bin/env node
const chalk = require("chalk");
const inquirer = require("inquirer");
const figlet = require("figlet");
const spawn = require("child_process").spawn;
const Spinner = require('cli-spinner').Spinner;

console.log(
    chalk.yellow(
        figlet.textSync('Spark-CLI', {horizontalLayout: 'full'})
    )
);

let spinnerObj;

const startSpinner = async (msg) => {
    spinnerObj = new Spinner(msg);
    spinnerObj.start();
}

const stopSpinner = async () => {
    if (spinnerObj.isSpinning()) {
        spinnerObj.stop(true);
    }
}

const longCommand = (command, onSuccess) => {
    return new Promise((resolve, reject) => {
        var process = spawn(command, {shell: true});
        startSpinner('project creation started: '.concat(command));
        process.on('exit', () => {
            stopSpinner();
            onSuccess();
            resolve();
        })
    })
}

inquirer
    .prompt([
        {
            name: "FrontendTechnology",
            type: "list",
            message: "Choose your frontend technology:",
            choices: ["ReactApp", "AngularApp", "VueApp"],
        },
    ])
    .then((technology) => {
        inquirer
            .prompt([
                {
                    name: "pkgMgr",
                    type: "list",
                    message: "Choose your package manager:",
                    choices: ["npm", "yarn"],
                },
            ]).then((pkgMgrAns) => {
            inquirer
                .prompt([
                    {
                        name: "Name",
                        type: "input",
                        message: "Project Name:",
                    },
                ])
                .then((projectNme) => {
                    if (technology.FrontendTechnology === 'ReactApp' && pkgMgrAns.pkgMgr === 'yarn') {
                        const yarnCreateProject = async () => {
                            await longCommand(`${pkgMgrAns.pkgMgr} create react-app ${projectNme.Name} --template typescript`, () => {
                                stopSpinner()
                                console.log(`\nproject created successfully! 👍`)
                            })
                        }
                        yarnCreateProject();
                    } else if (technology.FrontendTechnology === 'ReactApp' && pkgMgrAns === 'npm') {

                    } else {
                        console.log('Vue under construct');
                    }
                });
        });

    });

