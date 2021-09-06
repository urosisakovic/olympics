import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Competition = new Schema({
    name: {
        type: String
    },
    sport: {
        type: String
    },
    discipline: {
        type: String
    },
    gender: {
        type: String
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    location: {
        type: String
    },
    delegatUsername: {
        type: String
    },
    competitionFormat: {
        type: String
    },
    resultFormat: {
        type: String
    },
    pickedParticipants: [{
        type: String
    }]
});

export default mongoose.model('Competition', Competition, 'competitions');