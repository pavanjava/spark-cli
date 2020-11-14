const chalk = require("chalk");
const figlet = require("figlet");

console.log(
    chalk.yellow(
        figlet.textSync('Spark', { horizontalLayout: 'full' })
    )
);
