import { api } from './libs/api-client';
import fetch from 'node-fetch';

const newsletterAPI = api.newsletter(fetch)

// Send Newsletter to every authorized subscriber from another service
(async () => {
    const jwt = await newsletterAPI.auth.login('username', 'password')
    await newsletterAPI.subscribers.sendNewsletter(jwt, 'subject', 'newsletter message')
})();