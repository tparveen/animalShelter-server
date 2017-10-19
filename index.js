
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const Queue = require("./queue");

//import 'babel-polyfill';
//import express from 'express';
const HOST = process.env.HOST;
//const PORT = process.env.PORT || 8080;

console.log(`Server running in ${process.env.NODE_ENV} mode`);

const { PORT, CLIENT_ORIGIN } = require("./config");
//const {dbConnect} = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

const app = express();

app.use(express.static('public'));

//populate a cat and a dog queue and have it here

//function to create the queue of animals
const dogQ = new Queue();
const catQ = new Queue();

function makeDogQueue(dog) {
  //There is always a dog there
    dogQ.enqueue({
        //imageURL:'http:/', //add images to flick or AWS
        imageURL:'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg', //add images to flick or AWS
        name: "Zeus",
        gender: 'Male',
        age: "3 yrs",
        breed: "Golden Retriever",
        story: "Owner Passed away"
    });
    dogQ.enqueue({
        imageURL:'http://www.dogbreedslist.info/uploads/allimg/dog-pictures/German-Shepherd-Dog-1.jpg',
        name: "Tornado",
        gender:'Female',
        age: "5 yrs",
        breed: "German Shepard",
        story: "Owner moved to a small aparment"
    });
    dogQ.enqueue(dog); //whatever the shelter people enters
}
function makeCatQueue(cat) {
    catQ.enqueue({
        imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
        name: "Fluffy",
        gender: 'Female',
        age: "2 yrs",
        breed: "Bengal",
        story: "Thrown on the street"
    });
    catQ.enqueue({
        imageURL:'http://www.catvet.ca/wp-content/uploads/2016/07/cathealth_kitty.jpg',
        name: "Thunder",
        gender:'Male',
        age: "1 yr",
        breed: "Taby",
        story: "Owner moved to another country"
    });

    catQ.enqueue(cat); //whatever the shelter people enters
}

app.use(
    morgan(process.env.NODE_ENV === "production" ? "common" : "dev", {
        skip: (req, res) => process.env.NODE_ENV === "test"
    })
);

app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);

//create a get endpoint to retrieve a cat and a dog from the queue
app.get("/cat", (req, res) => {
    makeCatQueue({
        imageURL:'https://static.pexels.com/photos/20787/pexels-photo.jpg',
        name: "Tina",
        gender: 'Female',
        age: "3 yrs",
        breed: "siamese",
        story: "Owner did a runner"
    });
    return res.json(catQ.dequeue());
});

app.get("/dog", (req, res) => {
    makeDogQueue({
        imageURL:'http://img.freepik.com/free-photo/husky-breed-dog-with-tongue-out_1187-1500.jpg?size=338&ext=jpg',
        name: "Mystic",
        gender:'Female',
        age: "5 yrs",
        breed: "Husky",
        story: "Owner does not have time"
    });
    return res.json(dogQ.dequeue());
});

//have a put endpoint to put a dog and a cat in the dog and cat queue

function runServer(port = PORT) {
    const server = app
        .listen(port, () => {
        console.info(`App listening on port ${server.address().port}`);
        })
        .on("error", err => {
        console.error("Express failed to start");
        console.error(err);
        });
}


/*
function runServer() {
    return new Promise((resolve, reject) => {
        app.listen(PORT, HOST, (err) => {
            if (err) {
                console.error(err);
                reject(err);
            }

            const host = HOST || 'localhost';
            console.log(`Listening on ${host}:${PORT}`);
        });
    });
}
*/

if (require.main === module) {
  //dbConnect(); //remove this from the code - this is connecting to DB and we dont' want that
    runServer();
}
