import * as xlsx from 'xlsx';
import {Participant} from "./interfaces";

export async function readExcel(filePath: string): Promise<Participant[]> {
    const workbook = xlsx.readFile(filePath);
    const sheetNameList = workbook.SheetNames;
    let allData: Participant[] = [];

    sheetNameList.forEach(sheetName => {
        const sheet = workbook.Sheets[sheetName];
        const data: Participant[] = xlsx.utils.sheet_to_json(sheet) as Participant[];
        allData = allData.concat(data);
    });

    return allData.map(participant => ({
        ...participant,
        date_of_birth: participant.date_of_birth ? formatDate(participant.date_of_birth) : null
    }));
}

function formatDate(dateValue: string | number | undefined): string | null {
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
        return date.toISOString().split('T')[0];  // Format as YYYY-MM-DD
    } else {
        // Assume dateValue is already a formatted date string
        const date = new Date(dateValue);
        if (isNaN(date.getTime())) {
            throw new Error(`Invalid date value: ${dateValue}`);
        }
        return date.toISOString().split('T')[0];  // Format as YYYY-MM-DD
    }
}
