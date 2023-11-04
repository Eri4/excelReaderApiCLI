# ExelReaderApiCLI

This is a small cli that takes 2 arguments, the file path to an Excel file and api key to upload the data to this dummy api 'https://test-api.not.nrc.no/project-participants'.
It is build using:
node.js, typescript, axios, commander, figlet, xlsx.

## Installation

Just copy the repo and install use 'npm install' then 'node dist/index.js' and argumetns here

you can also do this:
'npm run build' and then 'npm install -g' .
The -g option tells npm to install the package globally and you can acces the cli normaly in your terminal using the name 'excelreaderapicli'.

## Usage

# Assume data.xlsx contains the following data:
# name, date_of_birth, address, phone_number
# John Doe, 1990-01-01, 123 Main St, 555-5555

'node dist/index.js --file data.xlsx --apikey your-api-key'

# Output:
# Successfully uploaded 1 participant(s) to the API.

