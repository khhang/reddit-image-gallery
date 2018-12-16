const express = require('express');
const request = require('request');
const url = require('url');
const querystring = require('querystring');
const cors = require('cors');
const config = require('../../config/config.js')
var http = require('http');

// Server configuration for proxy
const server = express();
server.set('port', 3000);
server.use(cors());

const client_id = config.client_id;
const secret = config.client_key;
var auth_token = '';
var ttl = null;

const token_endpoint = 'https://www.reddit.com/api/v1/access_token';
const base_endpoint = 'https://oauth.reddit.com';

server.use(['/r/*', '/api/*'], (req, res, next) => {
    // Get new token if there is no auth token or time has expired
    if(!auth_token || Date.now() >= ttl){
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${Buffer.from(`${client_id}:${secret}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
                'grant_type': 'client_credentials'
            },
            json: true
        };

        request(token_endpoint, options, (err, res, body) => {
            if(err){
                return err;
            }
            auth_token = body.access_token;
            ttl = Date.now() + body.expires_in;
            console.log(auth_token);
            next();
        });
    }else{
        next();        
    }
    console.log(auth_token);
});

// Server listen on port
server.listen(server.get('port'), function(){
    console.log('Express server listening on port ' + server.get('port'));
});

server.get('/r/*', (req, res) => {
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${auth_token}`,
            'Content-Type': 'application/json',
            'User-Agent': 'reddit-gallery'
        }
    };

    // Redirect request to reddit
    console.log(`Request to r: ${base_endpoint}${url.parse(req.url).pathname}?${querystring.stringify(req.query)}`)
    request(`${base_endpoint}${req.url}${querystring.stringify(req.query)}`, options, (e, r, b) => {
        if(e){
            res.status(500).send(e);
            return;
        }
        res.status(200).send(b);
        return;
    });
});

server.get('/api/*', (req, res) => {
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${auth_token}`,
            'Content-Type': 'application/json',
            'User-Agent': 'reddit-gallery'
        }
    };

    // Redirect request to reddit
    console.log(`Request to api: ${base_endpoint}${url.parse(req.url).pathname}?${querystring.stringify(req.query)}`)
    request(`${base_endpoint}${req.url}${querystring.stringify(req.query)}`, options, (e, r, b) => {
        if(e){
            res.status(500).send(e);
            return;
        }
        res.status(200).send(b);
        return;
    });
});