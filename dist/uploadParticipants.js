"use strict";
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
exports.uploadParticipants = void 0;
const axios_1 = __importDefault(require("axios"));
function uploadParticipants(participants, apiKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = 'https://test-api.not.nrc.no/project-participants';
        const headers = { 'NRC-API-KEY': apiKey };
        //if the API endpoint is designed to handle individual participant creation we can use this.
        // for (let participant of participants) {
        //     try {
        //         await axios.post(url, participant, { headers });
        //         console.log(`Uploaded participant ${participant.name}`);
        //     } catch (error) {
        //         console.error(`Failed to upload participant ${participant.name}:`, error);
        //     }
        // }
        //this is for batch uploads
        try {
            yield axios_1.default.post(url, participants, { headers });
            console.log(`Uploaded ${participants.length} participants`);
        }
        catch (error) {
            console.error('Failed to upload participants:', error);
        }
    });
}
exports.uploadParticipants = uploadParticipants;
//# sourceMappingURL=uploadParticipants.js.map