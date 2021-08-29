import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let RegistrationRequest = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    country: {
        type: String
    },
    email: {
        type: String
    },
    type: {
        type: String
    }
});

export default mongoose.model('RegistrationRequest', RegistrationRequest, 'registrationRequests');