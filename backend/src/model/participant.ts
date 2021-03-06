import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Participant = new Schema({
    name: {
        type: String
    },
    gender: {
        type: String
    },
    country: {
        type: String
    },
    goldMedalsWon: {
        type: Number
    },
    silverMedalsWon: {
        type: Number
    },
    bronzeMedalsWon: {
        type: Number
    },
    sport: {
        type: String
    },
    disciplines: [{
        type: String
    }]
});

export default mongoose.model('Participant', Participant, 'participants');