import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose, { mongo } from 'mongoose';
import user from './model/user';
import country from './model/country';
import registrationRequest from './model/registrationRequest';
import participant from './model/participant';
import sport from './model/sport';
import record from './model/record';

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
            console.log("username exists");
            res.status(200).json({'message': "username exists"});
        }
        else {

            registrationRequest.findOne({'username': username}, (err, regReq) => {
                if (err) {
                    console.log(err);
                }
                if (regReq) {
                    console.log("username existsc");
                    res.status(200).json({'message': "username exists"});
                } else {
                    const rrData = {
                        username: username,
                        password: password,
                        firstName: firstName,
                        lastName: lastName,
                        country: country,
                        email: email,
                        type: type
                    };
        
                    let rr = new registrationRequest(rrData);
        
                    rr.save(function(err, saved) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.status(200).json({'message': "ok"});
                        }
                    });            
                }
            });
        }
    });
});

router.route('/all-registration-requests').get((req, res) => {
    console.log("/all-registration-requests route hit");
    registrationRequest.find({}, (err, rr) => {
        if (err)
            console.log(err);
        else {
            res.json(rr);
        }
    });
});

router.route('/accept-register-request').post((req, res) => {
    console.log("/accept-register-request route hit route hit");

    const username = req.body.username;

    registrationRequest.findOne({'username': username}, function (err, rr) {
        if (err) {
            console.log(err);
            return res.status(200).json({'message': 'error'});
        } else {
            if (rr) {
                let rrObject = rr.toObject();

                const userData = {
                    username: rrObject.username,
                    password: rrObject.password,
                    firstName: rrObject.firstName,
                    lastName: rrObject.lastName,
                    country: rrObject.country,
                    email: rrObject.email,
                    type: rrObject.type
                }
    
                let newUser = new user(userData);
        
                newUser.save(function(err, saved) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.status(200).json({'message': "ok"});
                    }
                });            

                console.log("Deleted: ");
                console.log(rr);
                rr.remove();
                return res.status(200).json({'message': 'ok'});
            }
        }
    });
});

router.route('/decline-register-request').post((req, res) => {
    console.log("/decline-register-request route hit route hit");

    const username = req.body.username;

    registrationRequest.findOne({'username': username}, (err, rr) => {
        if (err) {
            console.log(err);
            return res.status(200).json({'message': 'error'});
        } else {
            if (rr) {
                console.log("Deleted: ");
                console.log(rr);
                rr.remove();
                return res.status(200).json({'message': 'ok'});
            }
        }
    });
});

router.route('/all-countries').get((req, res) => {
    console.log("/all-countries route hit route hit");

    country.find({}, (err, c) => {
        if (err)
            console.log(err);
        else {
            participant.find({}, (err, p) => {
                if (err)
                    console.log(err);

                let countries = [];

                for (let j = 0; j < c.length; j++) {
                    let country = c[j].toObject();
                    country.participantCount = 0;
                    country.goldMedalsWon = 0;
                    country.silverMedalsWon = 0;
                    country.bronzeMedalsWon = 0;

                    for (let i = 0; i < p.length; i++) {
                        let par = p[i].toObject();
                        if (country.name == par.country) {
                            country.participantCount++;
                            country.goldMedalsWon += par.goldMedalsWon;
                            country.silverMedalsWon += par.silverMedalsWon;
                            country.bronzeMedalsWon += par.bronzeMedalsWon;
                        }
                    }

                    countries.push(country);
                }
                res.json(countries);
            });
        }
    });
});

router.route('/all-delegats').get((req, res) => {
    console.log("/all-delegats route hit route hit");

    user.find({'type': 'delegat'}, (err, c) => {
        if (err)
            console.log(err);
        else {
            res.json(c);
        }
    });
});

router.route('/all-participants').get((req, res) => {
    console.log("/all-participants route hit route hit");

    participant.find({}, (err, c) => {
        if (err)
            console.log(err);
        else {
            res.json(c);
        }
    });
});

router.route('/all-sports').get((req, res) => {
    console.log("/all-sports route hit route hit");

    sport.find({}, (err, c) => {
        if (err)
            console.log(err);
        else {
            res.json(c);
        }
    });
});

router.route('/all-records').get((req, res) => {
    console.log("/all-records route hit route hit");

    record.find({}, (err, c) => {
        if (err)
            console.log(err);
        else {
            res.json(c);
        }
    });
});

router.route('/add-participants').post((req, res) => {
    console.log("/add-participants route hit");
    let country = req.body.country;
    let name = req.body.name;
    let gender = req.body.gender;
    let sport = req.body.sport;
    let discipline = req.body.discipline;

    console.log('Sport: ' + sport);

    participant.findOne({'name': name, 'country': country, 'gender': gender}, (err, par) => {
        if (err) {
            console.log(err);
        }
        if (par) {
            console.log('Participant exists. Appending discipline...');

            if (par.toObject().sport != sport) {
                res.status(200).json({'message': "other sport"});
                console.log("Wrong sport. Aborting...");
            } else {

                if (par.toObject().disciplines.includes(discipline)) {
                    res.status(200).json({'message': "already added"});
                    console.log("Already added. Aborting...");
                } else {
                    participant.collection.updateOne(
                        {'name': name, 'country': country, 'gender': gender},
                        {$push: {"disciplines": discipline}});
                    console.log("Succeess! Appended another discipline...");
                    res.status(200).json({'message': "ok"});
                }
            }
        }
        else {
            console.log('Participant does NOT exists. Adding participant...');

            const participantData = {
                'country': country,
                'name': name,
                'gender': gender,
                'sport': sport,
                'goldMedalsWon': 0,
                'silverMedalsWon': 0,
                'bronzeMedalsWon': 0,
                'disciplines': [discipline]
            };

            console.log(participantData);

            let newParticipant = new participant(participantData);
        
            newParticipant.save(function(err, saved) {
                if (err) {
                    console.log(err);
                } else {
                    res.status(200).json({'message': "ok"});
                }
            });   
        }
    });
});

router.route('/add-sport-with-discipline').post((req, res) => {
    console.log("//add-sport-with-discipline route hit");

    let sportName = req.body.sport;
    let discipline = req.body.discipline;
    let type = req.body.type;
    let minPlayers = req.body.minPlayers;
    let maxPlayers = req.body.maxPlayers;

    sport.findOne({'name': sportName, 'discipline': discipline}, (err, foundSport) => {
        if (err) {
            console.log(err);
        }

        if (foundSport) {
            console.log("Sport and discipline pair already exist. Aborting...");
            res.status(200).json({'message': "already exists"});
        }

        const sportData = {
            'name': sportName,
            'discipline': discipline,
            'type': type,
            'minPlayers': minPlayers,
            'maxPlayers': maxPlayers
        };

        let newSport = new sport(sportData);
    
        newSport.save(function(err, saved) {
            if (err) {
                console.log(err);
            } else {
                res.status(200).json({'message': "ok"});
            }
        });   
    });
});


app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));