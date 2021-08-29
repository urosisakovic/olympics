import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose, { mongo } from 'mongoose';
import user from './model/user';
import country from './model/country';

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/olympics');

const conn = mongoose.connection;

conn.once('open', () => {
    console.log('mongo open');
})

const router = express.Router();

router.route('/login').post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    user.findOne({'username': username, 'password': password}, (err, user) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(user);
        }
    })
});

router.route('/register-request').post((req, res) => {
    console.log("/register-request route hit");
    let username = req.body.username;
    let password = req.body.password;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let country = req.body.country;
    let email = req.body.email;
    let type = req.body.type;

    user.findOne({'username': username}, (err, user) => {
        if (err) {
            console.log(err);
        }
        if (user) {
            console.log('res.status(400)');
            res.status(400).json({'message': "username exists"});
        }
        else {
            console.log('res.status(200)');
            res.status(200).json({'message': "ok"});
        }
    });
});

router.route('/all-countries').get((req, res) => {
    country.find({}, (err, c) => {
        if (err)
            console.log(err);
        else {
            res.json(c);
        }
    });
});

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));