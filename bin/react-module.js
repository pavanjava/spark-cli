const spawn = require("child_process").spawn;
const spinnerModule = require("./spinner-module");

module.exports = {
    longCommand(command, onSuccess) {
        return new Promise((resolve, reject) => {
            var process = spawn(command, {shell: true});
            spinnerModule.startSpinner('project creation started: '.concat(command));
            process.on('exit', () => {
                spinnerModule.stopSpinner();
                onSuccess();
                resolve();
            })
        })
    }
}
