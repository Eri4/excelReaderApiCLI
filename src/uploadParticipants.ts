import axios from 'axios';
import { Participant } from './interfaces';

export async function uploadParticipants(participants: Participant[], apiKey: string): Promise<void> {
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
        await axios.post(url, participants, { headers });
        console.log(`Uploaded ${participants.length} participants`);
    } catch (error) {
        console.error('Failed to upload participants:', error);
    }

}