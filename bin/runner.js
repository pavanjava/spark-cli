#!/usr/bin/env node
const chalk = require("chalk");
const inquirer = require("inquirer");
const figlet = require("figlet");
const yargs = require("yargs");

const reactModule = require("./react-module");

const options = yargs
    .usage("Usage: -n <name>")
    .option("n", { alias: "name", describe: "Your name", type: "string", demandOption: true })
    .argv;

console.log(
    chalk.yellow(
        figlet.textSync('Spark-CLI', {horizontalLayout: 'full'})
    )
);

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

                            await reactModule.longCommand(`${pkgMgrAns.pkgMgr} create react-app ${projectNme.Name} --template typescript`, () => {
                                stopSpinner()
                                console.log(`\nproject created successfully! 👍`)
                            });
                        }
                        yarnCreateProject();
                    } else if (technology.FrontendTechnology === 'ReactApp' && pkgMgrAns === 'npm') {
                        const npmCreateProject = async () => {
                            await longCommand(`npx create-react-app ${projectNme.Name} --template typescript`, () => {
                                stopSpinner()
                                console.log(`\nproject created successfully! 👍`)
                            })
                        }
                        npmCreateProject();

                    } else if (technology.FrontendTechnology === 'AngularApp' && pkgMgrAns.pkgMgr === 'yarn') {
                        const yarnCreateAngularProject = async () => {
                            await longCommand(`ng new ${projectNme.Name}`, () => {
                                stopSpinner()
                                console.log(`\nproject created successfully! 👍`)
                            })
                        }
                        yarnCreateAngularProject();
                    } else if (technology.FrontendTechnology === 'AngularApp' && pkgMgrAns.pkgMgr === 'npm') {
                        const npmCreateAngularProject = async () => {
                            await longCommand(`ng new ${projectNme.Name}`, () => {
                                stopSpinner()
                                console.log(`\nproject created successfully! 👍`)
                            })
                        }
                        npmCreateAngularProject();
                    } else {
                        console.log('Vue under construct');
                    }
                });
        });

    });

