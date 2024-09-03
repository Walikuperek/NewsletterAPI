import { api } from './libs/api-client'

function appendSubscriber(email, fullName) {
    const newsletterAPI = api.newsletter(fetch)
    newsletterAPI.subscribers.addNewSubscriber(email, fullName) // or use await
        .then()
        .catch(console.error)
}
function submit() {
    const email = document.getElementById('email_input').value
    const fullName = document.getElementById('name_input').value
    return appendSubscriber(email, fullName)
}

// HTML: <input email, input name, <button onclick="submit()" />