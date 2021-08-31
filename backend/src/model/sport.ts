import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Sport = new Schema({
    name: {
        type: String
    },
    discipline: {
        type: String
    },
    type: {
        type: String
    },
    minPlayers: {
        type: Number
    },
    maxPlayers: {
        type: Number
    }
});

export default mongoose.model('Sport', Sport, 'sports');