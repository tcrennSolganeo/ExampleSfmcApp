const express = require('express');
const axios = require('axios');
const qs = require('querystring');
const router = express.Router();

const clientId = process.env.clientId || 'crernipo0tt7jfwneeuf37o2';
const clientSecret = process.env.clientSecret || '952ApC65s4e1TMiEDT9Vvxk4';
const redirectUri = process.env.redirectUri || 'http://localhost:3000/callback';
const subdomain = process.env.subdomain || 'mcjnmn9mfnxq4m36wvmtt59plqg1';

router.get('/', async (req, res) => {
    console.log('Handling callback from Salesforce');
    const code = req.query.code;

    const requestBody = {
        grant_type: 'authorization_code',
        code: code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri
    };

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    try {
        const response = await axios.post(`https://${subdomain}.auth.marketingcloudapis.com/v2/token`, qs.stringify(requestBody), config);
        req.session.accessToken = response.data.access_token;
        console.log('Access token stored in session:', req.session.accessToken);
        res.redirect('/');
    } catch (error) {
        console.error('Failed to exchange code for access token', error);
        res.status(500).send('Failed to exchange code for access token');
    }
});

module.exports = router;