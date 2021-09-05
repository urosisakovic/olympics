import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Country = new Schema({
    name: {
        type: String
    },
    flag: {
        type: String
    },
    participantCount: {
        type: Number
    },
    goldMedalsWon: {
        type: Number
    },
    silverMedalsWon: {
        type: Number
    },
    bronzeMedalsWon: {
        type: Number
    }
});

export default mongoose.model('Country', Country, 'countries');