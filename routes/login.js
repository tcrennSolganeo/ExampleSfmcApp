const express = require('express');
const router = express.Router();

const clientId = process.env.clientId || 'crernipo0tt7jfwneeuf37o2';
const clientSecret = process.env.clientSecret || '952ApC65s4e1TMiEDT9Vvxk4';
const redirectUri = process.env.redirectUri || 'http://localhost:3000/callback';
const subdomain = process.env.subdomain || 'mcjnmn9mfnxq4m36wvmtt59plqg1';

router.get('/', (req, res) => {
    console.log('Redirecting to Salesforce login page');
    const authorizationUrl = `https://${subdomain}.auth.marketingcloudapis.com/v2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    res.redirect(authorizationUrl);
});

module.exports = router;