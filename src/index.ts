#! /usr/bin/env node

import figlet from "figlet";
import {Command} from "commander";
import {readExcel} from "./readExcel";
import {uploadParticipants} from "./uploadParticipants";
import * as fs from 'fs';


const program = new Command();
console.log(figlet.textSync("Excel Reader Api CLI"));

interface Participant {
    name: string;
    date_of_birth: string;
    address: string;
    phone_number: string;
}

program
    .version("1.0.0")
    .description("A test form NRC to make a cli that reads a excel and calls a api")
    .option('-f, --file <path>', 'Path to the Excel file', 'file.xlsx')
    .option('-k, --apikey <value>', 'API Key for authentication')
    .parse(process.argv);

const options = program.opts();

(async () => {
    if (!options.file || !fs.existsSync(options.file)) {
        console.error('Error: The --file argument is required and the file must exist.');
        process.exit(1);
    }

    const data = await readExcel(options.file);
    if (options.apikey) {
        await uploadParticipants(data, options.apikey);
    } else {
        console.error('Error: The --apikey argument is required.');
    }
})();

