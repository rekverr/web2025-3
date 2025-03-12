const { program } = require('commander');
const fs = require('fs');

program
  .option('-i, --input <type>', 'path to input file (required)', String)
  .option('-o, --output <type>', 'path to output file (optional)', String)
  .option('-d, --display', 'display result in console (optional)')
  .parse(process.argv);

const options = program.opts();

if (!options.input) {
  console.error("Please, specify input file");
  process.exit(1);
}

if (!fs.existsSync(options.input)) {
  console.error("Cannot find input file");
  process.exit(1);
}
const inputData = JSON.parse(fs.readFileSync(options.input, 'utf8'));
const maxRate = Math.max(...inputData.map(entry => entry.rate));

if (options.output && options.display) {
  console.log(`Максимальний курс:${maxRate}`);
  fs.writeFileSync(options.output, `Максимальний курс: ${maxRate}`, 'utf8');
}

if (options.display) {
  console.log(`Максимальний курс: ${maxRate}`);
}

if (options.output) {
  fs.writeFileSync(options.output, `Максимальний курс: ${maxRate}`, 'utf8');
}