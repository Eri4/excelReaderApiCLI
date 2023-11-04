#! /usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const figlet_1 = __importDefault(require("figlet"));
const commander_1 = require("commander");
const readExcel_1 = require("./readExcel");
const uploadParticipants_1 = require("./uploadParticipants");
const fs = __importStar(require("fs"));
const program = new commander_1.Command();
console.log(figlet_1.default.textSync("Excel Reader Api CLI"));
program
    .version("1.0.0")
    .description("A test form NRC to make a cli that reads a excel and calls a api")
    .option('-f, --file <path>', 'Path to the Excel file', 'file.xlsx')
    .option('-k, --apikey <value>', 'API Key for authentication')
    .parse(process.argv);
const options = program.opts();
(() => __awaiter(void 0, void 0, void 0, function* () {
    if (!options.file || !fs.existsSync(options.file)) {
        console.error('Error: The --file argument is required and the file must exist.');
        process.exit(1);
    }
    const data = yield (0, readExcel_1.readExcel)(options.file);
    if (options.apikey) {
        yield (0, uploadParticipants_1.uploadParticipants)(data, options.apikey);
    }
    else {
        console.error('Error: The --apikey argument is required.');
    }
}))();
//# sourceMappingURL=index.js.map