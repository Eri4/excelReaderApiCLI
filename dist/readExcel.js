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
Object.defineProperty(exports, "__esModule", { value: true });
exports.readExcel = void 0;
const xlsx = __importStar(require("xlsx"));
function readExcel(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const workbook = xlsx.readFile(filePath);
        const sheetNameList = workbook.SheetNames;
        let allData = [];
        sheetNameList.forEach(sheetName => {
            const sheet = workbook.Sheets[sheetName];
            const data = xlsx.utils.sheet_to_json(sheet);
            allData = allData.concat(data);
        });
        return allData.map(participant => (Object.assign(Object.assign({}, participant), { date_of_birth: participant.date_of_birth ? formatDate(participant.date_of_birth) : null })));
    });
}
exports.readExcel = readExcel;
function formatDate(dateValue) {
    if (dateValue === undefined) {
        return null;
    }
    if (typeof dateValue === 'number') {
        // Assume Excel serial date number from Windows (adjust if using Mac)
        const excelEpoch = new Date(1899, 11, 30);
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        const date = new Date(excelEpoch.getTime() + dateValue * millisecondsPerDay);
        if (isNaN(date.getTime())) {
            throw new Error(`Invalid date value: ${dateValue}`);
        }
        return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    }
    else {
        // Assume dateValue is already a formatted date string
        const date = new Date(dateValue);
        if (isNaN(date.getTime())) {
            throw new Error(`Invalid date value: ${dateValue}`);
        }
        return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    }
}
//# sourceMappingURL=readExcel.js.map