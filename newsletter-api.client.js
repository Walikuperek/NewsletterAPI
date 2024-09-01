/**
 * @param fetchFn for browser simply `fetch` | for node `const fetch = require('node-fetch')`
 * @example Browser
 *  const client = NewsletterAPIClient(fetch)
 *  await client.subscribers.addNewSubscriber('email@em.com', 'Full Name')
 * 
 * @example NodeJS
 *  const fetch = require('node-fetch')
 *  const client = NewsletterAPIClient(fetch)
 *  const jwt = await client.auth.login('admin', 'password')
 *  await client.subscribers.sendNewsletterToAuthorizedSubscribers(jwt, 'subject', '1st newletter message 🎉🎂')
 */
function NewsletterAPIClient(fetchFn) {
    return {
        auth: {
            login: async (username, password) => await postData('/api/auth/login', {username, password})["token"],
            signup: async (jwt, username, password) => await postData('/api/auth/login', {username, password}, {'Authorization': jwt})
        },
        subscribers: {
            authorizeSubscriber: async (token) => await getData(`/api/subscribers/confirm/${token}`),
            addNewSubscriber: async (email, name) => await postData(`/api/subscribers/`, {email, name}),
            getAuthorizedSubscribers: async (jwt) => await getData(`/api/subscribers/`, {}, {'Authorization': jwt}),
            deleteSubscriber: async (jwt, id) => await deleteData(`/api/subscribers/${id}`, {'Authorization': jwt}),
            sendNewsletterToAuthorizedSubscribers: async (jwt, subject, message) =>
                await postData(`/api/subscribers/send`, {subject, message}, {'Authorization': jwt})
        }
    }
}

async function getData(url, headers = {}) {
    try {
        const response = await fetch(url, {headers});
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

async function postData(url, payload = {}, headers = {}) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

async function deleteData(url, headers = {}) {
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

module.exports = NewsletterAPIClient;
