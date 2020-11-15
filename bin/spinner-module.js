const Spinner = require('cli-spinner').Spinner;

let spinnerObj;
module.exports = {

    async startSpinner(msg) {
        spinnerObj = new Spinner(msg);
        spinnerObj.start();
    },

    async stopSpinner() {
        if (spinnerObj.isSpinning()) {
            spinnerObj.stop(true);
        }
    }
}
