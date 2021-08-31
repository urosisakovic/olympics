import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Record = new Schema({
    sport: {
        type: String
    },
    discipline: {
        type: String
    },
    place: {
        type: String
    },
    year: {
        type: Number
    },
    recordHolder: {
        type: String
    },
    record: {
        String
    }
});

export default mongoose.model('Record', Record, 'records');