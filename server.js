// Express
const express = require('express');
const engines = require('consolidate');
const helper = require('./functions/helper');
const pjson = require('./package.json');
const config = require('./config.json');
const bodyParser = require('body-parser');
const morgan = require('morgan');
var npid = require('npid');
const path = require('path');
const app = express();

// Consts are set from environment if not set, the default values are used
const SERVERURL = process.env.SERVER_URL || 'localhost';
const SERVERPORT = process.env.SERVER_PORT || 3000;
const EXTPORT = process.env.SERVER_EXT || 3000;

const REDISURL = process.env.REDIS_URL || config.redishost;
const REDISPORT = process.env.REDIS_PORT || config.redisport;

// Configure the service
app.use(express.static(path.join(__dirname, 'static')));
app.use(morgan('combined'));
app.set('views', __dirname + '/static');
app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


// Datastore
// Create a new redis Client
let redis = require('redis');
let client = redis.createClient(REDISPORT, REDISURL);
let jsonParser = bodyParser.json()


client.on('connect', function () {
    console.log('Redis client connected to Redis Server on [' + REDISURL + ':' + REDISPORT + ']');
});

client.on('error', function (err) {
    console.log('Something went wrong [' + REDISURL + ':' + REDISPORT + '] ' + err);
});


// Liveness and Health Probes
app.get('/liveness', (req, res) => {
    res.json({
        "app": {
            "version": pjson.version,
            "name": pjson.name,
            "description": pjson.description
        }
    });
});

app.get('/health', (req, res) => {
    res.json({"status": "UP"});
});

app.get('/generateCustomerId', (req, res) => {
    res.json({
        "id": helper.id()
    });
});


/**
 * VIEWS
 */
// Homepage
app.get('/', (req, res) => {
    res.render("static/index.html");
});


/**
 * API
 */
// POST
app.post('/assets', jsonParser, (req, res) => {
    let data = req.body;
    if (data === undefined || data === "" || data === null) {
        console.log("Aint no data buddy");
        res.json({
            'error': true,
            'message': 'body is mandatory'
        });
    }

    client.get(data.customer.id, (err, value) => {

        if (err) {
            res.json({
                'error': true,
                'message': 'ID already exists'
            });
        } else {
            data.customer.points = helper.getPoints(data.customer.points);
            client.set(data.customer.id, JSON.stringify(data), redis.print);

            res.json(data);
        }
    });
});

// PUT Assets
app.put('/assets', jsonParser, (req, res) => {

    let id = req.query.id;
    let nData = req.body;


    if (id === undefined || id === '' || id === null) {
        res.json({
            'error': true,
            'message': 'param id is mandatory'
        });
    } else {

        client.get(id, (err, value) => {

            if (err) {
                res.json({
                    'error': true,
                    'message': err
                });
            } else {

                oData = JSON.parse(value);
                if(nData.customer.evu === undefined && oData.customer.evu !== undefined) {
                    console.log(oData.customer.assets);
                    console.log(nData.customer.assets);
                    nData.customer.assets = oData.customer.assets;
                }

                //console.log(JSON.stringify(oData));
                nData.customer.points = helper.getPoints(oData.customer.points);

                client.del(id);
                client.set(id, JSON.stringify(nData), redis.print);

                res.json(nData);
            }
        });
    }
});

/**
 * Get the assets based on a Customer ID
 */
app.get('/assets', (req, res) => {

    let id = req.query.id;

    if (id === undefined || id === "" || id === null) {
        res.json({
            'error': true,
            'message': 'ID is mandatory'
        })
    } else {
        client.get(id, (err, value) => {

            if (err) {
                res.json({
                    'error': true,
                    'message': 'Could not find customer with id' + id
                });
            } else {
                res.json(JSON.parse(value));
            }

        })
    }


});


// print the application Head
helper.printHead();

// Listener
app.listen(SERVERPORT, () => console.log(`server started on http://${SERVERURL}:${EXTPORT}`));
