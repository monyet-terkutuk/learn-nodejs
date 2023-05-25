const validator = require("validator");
const chalk = require("chalk");

console.log(chalk.italic.bgBlue("Hello world!"));

const text = "Sun Wukong Berubah jadi Empat";

console.log(chalk.bold.red.bgYellow(text));

console.log(validator.isEmail("gabriel@email.co"));

console.log(validator.isMobilePhone("211622060619", "id-ID"));

console.log(validator.isNumeric("345"));
